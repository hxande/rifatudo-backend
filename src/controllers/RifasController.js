const RifasController = require("../models/RifasModel");

exports.selectAllRifas = function (callback) {
    RifasController.selectAllRifas(callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    RifasController.selectIdRifas(idRifas, callback);
};

exports.insertRifas = function (data, callback) {
    RifasController.insertRifas(data, callback);
};

exports.deleteRifas = function (idRifas) {
    RifasController.deleteRifas(idRifas);
};