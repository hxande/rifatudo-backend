const EnderecosModel = require("../models/EnderecosModel");

exports.selectAllEnderecos = function (callback) {
    EnderecosModel.selectAllEnderecos(callback);
};

exports.selectIdEnderecos = function (idEndereco, callback) {
    EnderecosModel.selectIdEnderecos(idEndereco, callback);
};

exports.insertEnderecos = function (data, callback) {
    EnderecosModel.insertEnderecos(data, callback);
};

exports.deleteEnderecos = function (idEndereco) {
    EnderecosModel.deleteEnderecos(idEndereco);
};