const { Router } = require('express');
const EnderecosController = require('../controllers/EnderecosController');

enderecosRoutes = Router();

// ENDERECOS
enderecosRoutes.get('/ends', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    EnderecosController.selectAllEnderecos(callback);
});

enderecosRoutes.get('/ends/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    EnderecosController.selectIdEnderecos(id, callback);
});

enderecosRoutes.post('/ends', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    EnderecosController.insertEnderecos(data, callback);

    res.sendStatus(200);
});

enderecosRoutes.delete('/ends/:id', (req, res) => {
    const { id } = req.params;
    EnderecosController.deleteEnderecos(id);

    res.sendStatus(200);
});

module.exports = enderecosRoutes;