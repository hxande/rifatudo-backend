const UsuariosModel = require("../models/UsuariosModel");

exports.selectAllUsuarios = function (callback) {
    UsuariosModel.selectAllUsuarios(callback);
};

exports.selectIdUsuarios = function (idUsuario, callback) {
    UsuariosModel.selectIdUsuarios(idUsuario, callback);
};

exports.insertUsuarios = function (data, callback) {
    UsuariosModel.insertUsuarios(data, callback);
};

exports.deleteUsuarios = function (idUsuario) {
    UsuariosModel.deleteUsuarios(idUsuario);
};