const ImagensModel = require("../models/ImagensModel");

exports.selectAllImagens = function (callback) {
    ImagensModel.selectAllImagens(callback);
};

exports.selectIdImagens = function (idImagens, callback) {
    ImagensModel.selectIdImagens(idImagens, callback);
};

exports.selectIdRifas = function (idRifas, callback) {
    ImagensModel.selectIdRifas(idRifas, callback);
};

exports.insertImagens = function (idRifas, num, data) {
    function callback(idImagens) {
        console.log("Insert Imagem " + idImagens);
    }
    ImagensModel.insertImagens(idRifas, num, data, callback);
};

exports.deleteImagens = function (idImagens) {
    ImagensModel.deleteImagens(idImagens);
};