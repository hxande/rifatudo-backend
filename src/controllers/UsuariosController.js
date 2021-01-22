const UsuariosModel = require('../models/UsuariosModel');
const bcrypt = require('bcrypt');

exports.selectAllUsuarios = function (callback) {
    UsuariosModel.selectAllUsuarios(callback);
};

exports.selectUsernameUsuarios = function (username, callback) {
    UsuariosModel.selectUsernameUsuarios(username, callback);
};

exports.validarUsuarioSenha = async function (username, password, callback) {
    UsuariosModel.validarUsuarioSenha(username, password, callback);
};

exports.selectIdUsuarios = function (idUsuarios, callback) {
    UsuariosModel.selectIdUsuarios(idUsuarios, callback);
};

exports.insertUsuarios = function (data, callback) {
    async function cryptPass(password) {
        const encrypted = await bcrypt.hash(password, 8);
        console.log(encrypted);
        data.password = encrypted;
        UsuariosModel.insertUsuarios(data, callback);
    }
    cryptPass(data.password);
};

exports.deleteUsuarios = function (idUsuarios) {
    UsuariosModel.deleteUsuarios(idUsuarios);
};