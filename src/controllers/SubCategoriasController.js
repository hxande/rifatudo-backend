const SubCategoriasModel = require("../models/SubCategoriasModel");

exports.selectAllSubCategorias = function (callback) {
    SubCategoriasModel.selectAllSubCategorias(callback);
};

exports.selectIdSubCategorias = function (idSubCategorias, callback) {
    SubCategoriasModel.selectIdSubCategorias(idSubCategorias, callback);
};

exports.insertSubCategorias = function (data, callback) {
    SubCategoriasModel.insertSubCategorias(data, callback);
};

exports.deleteSubCategorias = function (idSubCategorias) {
    SubCategoriasModel.deleteSubCategorias(idSubCategorias);
};