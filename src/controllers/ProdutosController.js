const ProdutosModel = require("../models/ProdutosModel");

exports.selectAllProdutos = function (callback) {
    ProdutosModel.selectAllProdutos(callback);
};

exports.selectIdProdutos = function (idCategoria, callback) {
    ProdutosModel.selectIdProdutos(idCategoria, callback);
};

exports.insertProdutos = function (data, callback) {
    ProdutosModel.insertProdutos(data, callback);
};

exports.deleteProdutos = function (idCategoria) {
    ProdutosModel.deleteProdutos(idCategoria);
};