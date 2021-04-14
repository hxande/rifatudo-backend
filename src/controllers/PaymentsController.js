const MercadoPago = require('mercadopago');
const db = require('../db.js');

const getFullUrl = (req) => {
    const url = req.protocol + '://' + req.get('host');
    console.log(url)
    return url;
}

module.exports = {
    async checkout(req, res) {

        console.log(process.env)
        MercadoPago.configure({
            sandbox: process.env.SANDBOX == 'true' ? true : false,
            access_token: process.env.MP_ACCESS_TOKEN
        });

        const { id, email, description, amount } = req.params;

        //Create purchase item object template
        const purchaseOrder = {
            items: [
                item = {
                    id: id,
                    title: description,
                    description: description,
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: parseFloat(amount)
                }
            ],
            payer: {
                email: email
            },
            auto_return: "all",
            external_reference: id,
            back_urls: {
                success: getFullUrl(req) + "/payments/success",
                pending: getFullUrl(req) + "/payments/pending",
                failure: getFullUrl(req) + "/payments/failure",
            }
        }

        //Generate init_point to checkout
        try {
            const preference = await MercadoPago.preferences.create(purchaseOrder);
            return res.redirect(`${preference.body.init_point}`);
        } catch (err) {
            return res.send(err.message);
        }
    }
};

module.exports.payConfirmed = async function (data, res) {
    const sql = 'INSERT INTO tb_payments (id_raffle, id_user, quotas, meth, value) VALUES($1, $2, $3, $4, $5)';
    const values = [data.raffle, data.user, data.quotas, data.method, data.value];
    const arrayQuotas = data.quotas.split(',');

    const client = await db.connect();
    const response = await client.query(sql, values);

    const sqlBuyer = 'INSERT INTO tb_statements (id_raffle, id_user, kind, value) VALUES($1, $2, $3, $4)';
    const valuesBuyer = [data.raffle, data.user, 1, data.value - (0.25 * arrayQuotas.length)];
    const responseBuyer = await client.query(sqlBuyer, valuesBuyer);

    const sqlSeller = 'INSERT INTO tb_statements (id_raffle, id_user, kind, value) VALUES($1, $2, $3, $4)';
    const valuesSeller = [data.raffle, data.user, 2, data.value - (0.25 * arrayQuotas.length)];
    const responseSeller = await client.query(sqlSeller, valuesSeller);

    arrayQuotas.forEach(async (element, index) => {
        const sqlUpdateQuota = `UPDATE tb_quotas SET id_user = ${data.user}, status = 3, updated_at = now() WHERE id_raffle = ${data.raffle} AND num = ${element}`;
        const responseUpdate = await client.query(sqlUpdateQuota);

        if (index === (arrayQuotas.length - 1)) {
            client.release();
            res.sendStatus(200);
        }
    });
};

module.exports.payPending = async function (data, res) {
    const sql = 'INSERT INTO tb_payments (id_raffle, id_user, quotas, meth, value) VALUES($1, $2, $3, $4, $5)';
    const values = [data.raffle, data.user, data.quotas, data.method, data.value];
    const arrayQuotas = data.quotas.split(',');

    const client = await db.connect();
    const response = await client.query(sql, values);

    arrayQuotas.forEach(async (element, index) => {
        const sqlUpdateQuota = `UPDATE tb_quotas SET id_user = ${data.user}, status = 1, updated_at = now() WHERE id_raffle = ${data.raffle} AND num = ${element}`;
        const responseUpdate = await client.query(sqlUpdateQuota);

        if (index === (arrayQuotas.length - 1)) {
            client.release();
            res.sendStatus(200);
        }
    });
};