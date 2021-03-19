const CotasModel = require('../models/CotasModel');

exports.selectAllCotas = function (callback) {
    CotasModel.selectAllCotas(callback);
};

exports.selectIdCotas = function (idCotas, callback) {
    CotasModel.selectIdCotas(idCotas, callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    CotasModel.selectIdRifas(idRifas, callback);
};

exports.selectIdUsuarios = function (idUsuarios, callback) {
    CotasModel.selectIdUsuarios(idUsuarios, callback);
};

exports.insertCotas = function (data) {
    function callback(idCotas) {
        console.log('Insert Cota: ' + idCotas);
    }
    CotasModel.insertCotas(data, callback);
};

exports.deleteCotas = function (idCotas) {
    CotasModel.deleteCotas(idCotas);
};

exports.selectCountCotasStatus = function (idRifas, status, callback) {
    CotasModel.selectCountCotasStatus(idRifas, status, callback);
};

exports.payCotas = function (idUsuarios, data) {
    function callback(idCotas) {
        console.log('Pay Cota ' + idCotas);
    }

    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        element.id_usuario = idUsuarios;
        CotasModel.pagarCotas(element, callback);
    }
};

exports.pendingQuotas = function (idRaffle, data) {
    function callback(idQuota) {
        console.log('Pending Quota ' + idQuota);
    }

    const arrayQuotas = data.quotas.split(',');

    for (let index = 0; index < arrayQuotas.length; index++) {
        CotasModel.pendingQuotas(data.user, idRaffle, arrayQuotas[index], callback);
    }
};