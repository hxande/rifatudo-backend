const { Router } = require('express');
const UsuariosController = require('../controllers/UsuariosController');

usuariosRoute = Router();

// USUARIOS
usuariosRoute.get('/users', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    UsuariosController.selectAllUsuarios(callback);
});

usuariosRoute.get('/users/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    UsuariosController.selectIdUsuarios(id, callback);
});

usuariosRoute.post('/users', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    UsuariosController.insertUsuarios(data, callback);

    res.sendStatus(200);
});

usuariosRoute.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    UsuariosController.deleteUsuarios(id);

    res.sendStatus(200);
});

module.exports = usuariosRoute;