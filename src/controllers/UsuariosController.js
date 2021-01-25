const UsuariosModel = require('../models/UsuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.selectAllUsuarios = function (callback) {
    UsuariosModel.selectAllUsuarios(callback);
};

exports.selectUsernameUsuarios = function (username, callback) {
    UsuariosModel.selectUsernameUsuarios(username, callback);
};

exports.validateUserPass = async function (username, password, res) {
    async function callback(row, password) {
        if (row.length > 0) {
            if (await bcrypt.compare(String(password), String(row[0].password))) {
                const user = {
                    id: row[0].ID,
                    email: row[0].email,
                    name: row[0].nome,
                    surname: row[0].sobrenome,
                }
                res.json({
                    user,
                    token: jwt.sign(user, 'PRIVATEKEY'),
                });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(404);
        }
    }
    UsuariosModel.validateUserPass(username, password, callback);
};

exports.selectIdUsuarios = function (idUsuarios, callback) {
    UsuariosModel.selectIdUsuarios(idUsuarios, callback);
};

exports.insertUsuarios = function (data, callback) {
    async function cryptPass(password) {
        const encrypted = await bcrypt.hash(password, 8);
        data.password = encrypted;
        UsuariosModel.insertUsuarios(data, callback);
    }
    cryptPass(data.password);
};

exports.deleteUsuarios = function (idUsuarios) {
    UsuariosModel.deleteUsuarios(idUsuarios);
};