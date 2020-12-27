const { Router } = require('express');
const CotasController = require('../controllers/CotasController');

cotasRoute = Router();

// COTAS
cotasRoute.get('/cotas', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    CotasController.selectAllCotas(callback);
});

cotasRoute.get('/cotas/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    CotasController.selectIdCotas(id, callback);
});

cotasRoute.get('/rifas/:id/cotas', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    CotasController.selectIdRifas(id, callback);
});

cotasRoute.post('/cotas', (req, res) => {
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    CotasController.insertCotas(data, callback);

    res.sendStatus(200);
});

cotasRoute.delete('/cotas/:id', (req, res) => {
    const { id } = req.params;
    CotasController.deleteCotas(id);

    res.sendStatus(200);
});

module.exports = cotasRoute;