const CategoriasModel = require('../models/CategoriasModel');

exports.selectAllCategorias = function (callback) {
    CategoriasModel.selectAllCategorias(callback);
};

exports.selectIdCategorias = function (idCategorias, callback) {
    CategoriasModel.selectIdCategorias(idCategorias, callback);
};

exports.insertCategorias = function (data, callback) {
    CategoriasModel.insertCategorias(data, callback);
};

exports.deleteCategorias = function (idCategorias) {
    CategoriasModel.deleteCategorias(idCategorias);
};