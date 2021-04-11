const db = require('../db.js');
const RifasModel = require('../models/RifasModel');
const CotasModel = require('../models/CotasModel');
const CotasController = require('../controllers/CotasController');

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
        CotasController.insertQuota(cota);
    }
};












exports.selectAllRifas = function (callback) {
    RifasModel.selectAllRifas(callback);
};

exports.selectRafflesByPage = function (page, callback) {
    RifasModel.selectRafflesByPage(page, callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    RifasModel.selectIdRifas(idRifas, callback);
};

exports.selectMyRifas = function (idUsuarios, callback) {
    RifasModel.selectMyRifas(idUsuarios, callback);
};

exports.deleteRifas = function (idRifas) {
    RifasModel.deleteRifas(idRifas);
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