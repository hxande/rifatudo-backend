const RifasModel = require("../models/RifasModel");
const CotasController = require("../controllers/CotasController");

exports.selectAllRifas = function (callback) {
    RifasModel.selectAllRifas(callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    RifasModel.selectIdRifas(idRifas, callback);
};

exports.insertRifas = function (data) {
    const { qtd_cotas, qtd_cotas_g, valor } = data;
    const valor_cota = valor / (qtd_cotas - qtd_cotas_g);

    function callback(id_rifa) {
        for (let index = 0; index < qtd_cotas; index++) {
            let cota = {};
            cota.id_rifa = id_rifa;
            cota.id_usuario = 1;
            cota.num = index;
            cota.status = 0;
            cota.valor = index < qtd_cotas_g ? 0 : valor_cota;
            CotasController.insertCotas(cota);
        }
    }

    RifasModel.insertRifas(data, callback);
};

exports.deleteRifas = function (idRifas) {
    RifasModel.deleteRifas(idRifas);
};