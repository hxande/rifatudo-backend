const { Router } = require('express');
const UsuariosController = require('../controllers/UsuariosController');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
let db = new sqlite3.Database(dbPath);

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
    db.get('SELECT * FROM usuarios WHERE username = ? LIMIT 1', data.username, function (err, row) {
        if (err) {
            console.log(err);
        } else if (row) {
            res.sendStatus(422);
        } else {
            function callback(rows) {
                console.log(rows);
            }
            UsuariosController.insertUsuarios(data, callback);
            res.sendStatus(200);
        }
    });
});

usuariosRoute.post('/users/auth', (req, res) => {
    const { username, password } = req.body.data;
    UsuariosController.validateUserPass(username, password, res);
});

usuariosRoute.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    UsuariosController.deleteUsuarios(id);

    res.sendStatus(200);
});

module.exports = usuariosRoute;