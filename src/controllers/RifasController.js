const RifasModel = require('../models/RifasModel');
const CotasModel = require('../models/CotasModel');
const CotasController = require('../controllers/CotasController');

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

exports.insertRifas = function (data, callbackParent) {
    const { qtd_cotas, qtd_cotas_g, valor, imagem1, imagem2, imagem3 } = data;
    const valor_cota = valor / (qtd_cotas - qtd_cotas_g);

    function callback(idRifas, callbackParent) {

        for (let index = 0; index < qtd_cotas; index++) {
            let cota = {};
            cota.id_rifa = idRifas;
            cota.id_usuario = 0;
            cota.num = index;
            cota.status = 0;
            cota.valor = index < qtd_cotas_g ? 0 : valor_cota;
            CotasController.insertCotas(cota);
        }

        callbackParent(idRifas);
    }

    RifasModel.insertRifas(data, callback, callbackParent);
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