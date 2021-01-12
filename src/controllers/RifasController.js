const RifasModel = require("../models/RifasModel");
const ImagensController = require("../controllers/ImagensController");
const CotasController = require("../controllers/CotasController");

exports.selectAllRifas = function (callback) {
    RifasModel.selectAllRifas(callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    RifasModel.selectIdRifas(idRifas, callback);
};

exports.insertRifas = function (data, callbackParent) {
    const { qtd_cotas, qtd_cotas_g, valor, imagem1, imagem2, imagem3 } = data;
    const valor_cota = valor / (qtd_cotas - qtd_cotas_g);

    function callback(idRifas, callbackParent) {

        for (let index = 0; index < qtd_cotas; index++) {
            let cota = {};
            cota.id_rifa = idRifas;
            cota.id_usuario = 1;
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