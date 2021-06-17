const db = require('../db.js');
const QuotasController = require('../controllers/QuotasController');

exports.selectRafflesByPage = async function (page, res) {
    let arrayResponse = [];
    const newRange = (page - 1) * 5;

    const sql = `SELECT * FROM tb_raffles WHERE status > 0 ORDER BY created_at LIMIT 5 OFFSET ${newRange}`;
    const client = await db.connect();

    const response = await client.query(sql);
    response.rows.map(async (row, index) => {
        const newRow = row;

        const sqlCount = `SELECT count(*) total FROM tb_quotas WHERE status > 0 AND id_raffle = ${row.id}`;
        const responseCount = await client.query(sqlCount);
        newRow.qttBuyed = responseCount.rows[0].total;

        const sqlImage = `SELECT * FROM tb_images WHERE id_raffle = ${row.id} AND num = 1`;
        const responseImage = await client.query(sqlImage);
        console.log(responseImage);
        newRow.imageUrl = `http://rifatudo.s3-website-us-east-1.amazonaws.com/${responseImage.rows[0].file}`;

        const deadline = new Date(row.updated_at.toLocaleDateString().slice(0, 10));
        const deadlineAdd = deadline.setDate(deadline.getDate() + row.duration);
        newRow.deadline = new Date(deadlineAdd);

        arrayResponse.push(newRow);
        if (index === (response.rows.length - 1)) {
            client.release();
            res.json(arrayResponse);
        }
    });
};

exports.insertRaffle = async function (data) {
    const sql = 'INSERT INTO tb_raffles (id_user, title, description, status, value, id_category, uf, city, qtt, qtt_free, qtt_min, qtt_winners, duration) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
    const values = [data.id_user, data.title, data.description, data.status, data.value, data.id_category, data.uf, data.city, data.qtt, data.qtt_free, data.qtt_min, data.qtt_winners, data.duration];

    const client = await db.connect();
    const response = await client.query(sql, values);
    client.release();

    const raffleId = response.rows[0].id;
    const quotaValue = data.value / (data.qtt - data.qtt_free);

    for (let index = 0; index < data.qtt; index++) {
        const cota = {};
        cota.id_raffle = raffleId;
        cota.id_user = 0;
        cota.num = index;
        cota.status = 0;
        cota.value = index < data.qtt_free ? 0 : quotaValue;
        QuotasController.insertQuota(cota);
    }

    return response;
};




exports.checkStatus = function (raffle) {
    function callbackParent(qttMin) {
        function callback(count) {
            if (count.total >= +qttMin.qtd_cotas_m) {
                RifasModel.updateRafflesStatus(raffle, 2);
            }
        }
        CotasModel.selectCountQuotasSold(raffle, callback);
    }

    RifasModel.selectRafflesQttMin(raffle, callbackParent);
};