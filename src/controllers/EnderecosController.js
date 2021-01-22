const EnderecosModel = require('../models/EnderecosModel');

exports.selectAllEnderecos = function (callback) {
    EnderecosModel.selectAllEnderecos(callback);
};

exports.selectIdEnderecos = function (idEnderecos, callback) {
    EnderecosModel.selectIdEnderecos(idEnderecos, callback);
};

exports.insertEnderecos = function (data, callback) {
    EnderecosModel.insertEnderecos(data, callback);
};

exports.deleteEnderecos = function (idEnderecos) {
    EnderecosModel.deleteEnderecos(idEnderecos);
};