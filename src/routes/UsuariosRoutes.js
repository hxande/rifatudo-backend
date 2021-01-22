const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsuariosController = require('../controllers/UsuariosController');

const usuariosRoute = Router();

usuariosRoute.get('/users', (req, res) => {
    const { username } = req.query
    function callback(row) {
        res.json(row);
    }
    if (username) {
        const resp = UsuariosController.selectUsernameUsuarios(username, callback);
        console.log(resp);
    } else {
        UsuariosController.selectAllUsuarios(callback);
    }
});

usuariosRoute.get('/users/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    UsuariosController.selectIdUsuarios(id, callback);
});

usuariosRoute.post('/users', (req, res) => {
    let { data } = req.body;
    function callback(rows) {
        console.log(rows);
    }
    UsuariosController.insertUsuarios(data, callback);

    res.sendStatus(200);
});

usuariosRoute.post('/users/auth', (req, res) => {
    const { username, password } = req.body.data;
    async function callback(row, password) {
        if (row.length > 0) {
            if (await bcrypt.compare(String(password), String(row[0].password))) {
                let user = {
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
    UsuariosController.validarUsuarioSenha(username, password, callback);
});

usuariosRoute.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    UsuariosController.deleteUsuarios(id);

    res.sendStatus(200);
});

module.exports = usuariosRoute;