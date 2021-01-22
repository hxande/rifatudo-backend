const { Router } = require('express');
const EnderecosController = require('../controllers/UsuariosController');

const enderecosRoute = Router();

enderecosRoute.get('/ends', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    EnderecosController.selectAllEnderecos(callback);
});

enderecosRoute.get('/ends/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    EnderecosController.selectIdEnderecos(id, callback);
});

enderecosRoute.post('/ends', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
    }
    EnderecosController.insertEnderecos(data, callback);

    res.sendStatus(200);
});

enderecosRoute.delete('/ends/:id', (req, res) => {
    const { id } = req.params;
    EnderecosController.deleteEnderecos(id);

    res.sendStatus(200);
});

module.exports = enderecosRoute;