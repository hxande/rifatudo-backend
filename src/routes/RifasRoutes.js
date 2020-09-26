const { Router } = require('express');
const RifasController = require('../controllers/RifasController');

rifasRoute = Router();

// USUARIOS
rifasRoute.get('/rifas', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    RifasController.selectAllRifas(callback);
});

rifasRoute.get('/rifas/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    RifasController.selectIdRifas(id, callback);
});

rifasRoute.post('/rifas', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    RifasController.insertRifas(data, callback);

    res.sendStatus(200);
});

rifasRoute.delete('/rifas/:id', (req, res) => {
    const { id } = req.params;
    RifasController.deleteRifas(id);

    res.sendStatus(200);
});

module.exports = rifasRoute;