const { Router } = require('express');
const authMiddleware = require('../auth');
const CotasController = require('../controllers/CotasController');

const cotasRoute = Router();

cotasRoute.post('/cotas', (req, res) => {
    const { data } = req.body;
    function callback(row) {
        console.log(row);
    }
    CotasController.insertCotas(data, callback);

    res.sendStatus(200);
});

cotasRoute.delete('/cotas/:id', (req, res) => {
    const { id } = req.params;
    CotasController.deleteCotas(id);

    res.sendStatus(200);
});

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

cotasRoute.get('/users/:id/cotas', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    CotasController.selectIdUsuarios(id, callback);
});

cotasRoute.get('/rifas/:id/cotas', (req, res) => {
    const { id } = req.params;
    function callback(rows) {
        rows.sort((a, b) => (a.num > b.num) ? 1 : ((b.num > a.num) ? -1 : 0));
        res.json(rows);
    }
    CotasController.selectIdRifas(id, callback);
});

cotasRoute.get('/rifas/:id/cotas/status/:status/contagem', (req, res) => {
    const { id, status } = req.params;
    function callback(rows) {
        res.json(rows);
    }
    CotasController.selectCountCotasStatus(id, status, callback);
});

cotasRoute.post('/users/:user/rifas/:id/cotas/comprar', authMiddleware, (req, res) => {
    const { data } = req.body;
    const { user } = req.params;
    CotasController.payCotas(user, data);

    res.sendStatus(200);
});

cotasRoute.put('/raffles/:raffle/quotas/pending', authMiddleware, (req, res) => {
    const { raffle } = req.params;
    try {
        CotasController.pendingQuotas(raffle, req.body);
    } catch (error) {
        console.log(error);
    }

    res.sendStatus(200);
});

module.exports = cotasRoute;