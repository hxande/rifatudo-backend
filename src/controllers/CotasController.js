const CotasModel = require("../models/CotasModel");

exports.selectAllCotas = function (callback) {
    CotasModel.selectAllCotas(callback);
};

exports.selectIdCotas = function (idCotas, callback) {
    CotasModel.selectIdCotas(idCotas, callback);
};

exports.insertCotas = function (data) {
    function callback(id_cota) {
        console.log("Insert Cota " + id_cota);
    }

    CotasModel.insertCotas(data, callback);
};

exports.deleteCotas = function (idCotas) {
    CotasModel.deleteCotas(idCotas);
};