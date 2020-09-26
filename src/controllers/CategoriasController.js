const CategoriasModel = require("../models/CategoriasModel");

exports.selectAllCategorias = function (callback) {
    CategoriasModel.selectAllCategorias(callback);
};

exports.selectIdCategorias = function (idCategoria, callback) {
    CategoriasModel.selectIdCategorias(idCategoria, callback);
};

exports.insertCategorias = function (data, callback) {
    CategoriasModel.insertCategorias(data, callback);
};

exports.deleteCategorias = function (idCategoria) {
    CategoriasModel.deleteCategorias(idCategoria);
};