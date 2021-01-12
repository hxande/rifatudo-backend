const CotasModel = require("../models/CotasModel");

exports.selectAllCotas = function (callback) {
    CotasModel.selectAllCotas(callback);
};

exports.selectIdCotas = function (idCotas, callback) {
    CotasModel.selectIdCotas(idCotas, callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    CotasModel.selectIdRifas(idRifas, callback);
};

exports.insertCotas = function (data) {
    function callback(idCotas) {
        console.log("Insert Cota " + idCotas);
    }
    CotasModel.insertCotas(data, callback);
};

exports.deleteCotas = function (idCotas) {
    CotasModel.deleteCotas(idCotas);
};

exports.selectDescCotas = function (idRifas, callback) {
    CotasModel.selectDescCotas(idRifas, callback);
};