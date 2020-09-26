const CotasController = require("../models/CotasModel");

exports.selectAllCotas = function (callback) {
    CotasController.selectAllCotas(callback);
};

exports.selectIdCotas = function (idCotas, callback) {
    CotasController.selectIdCotas(idCotas, callback);
};

exports.insertCotas = function (data, callback) {
    CotasController.insertCotas(data, callback);
};

exports.deleteCotas = function (idCotas) {
    CotasController.deleteCotas(idCotas);
};