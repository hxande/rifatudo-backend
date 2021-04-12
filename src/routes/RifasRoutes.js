const { Router } = require('express');
const RifasController = require('../controllers/RifasController');

const rifasRoute = Router();

rifasRoute.get('/rifas', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    RifasController.selectAllRifas(callback);
});

// rifasRoute.get('/raffles/pages/:page', (req, res) => {
//     const { page } = req.params;
//     function callback(row) {
//         res.json(row);
//     }
//     RifasController.selectRafflesByPage(page, callback);
// });

// rifasRoute.get('/rifas/:id', (req, res) => {
//     const { id } = req.params;
//     function callback(row) {
//         res.json(row);
//     }
//     RifasController.selectIdRifas(id, callback);
// });

rifasRoute.get('/rifas/:id/my', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    RifasController.selectMyRifas(id, callback);
});

rifasRoute.post('/rifas', (req, res) => {
    const { data } = req.body;
    function callback(id) {
        res.json(id);
    }
    RifasController.insertRifas(data, callback);
});

rifasRoute.delete('/rifas/:id', (req, res) => {
    const { id } = req.params;
    RifasController.deleteRifas(id);

    res.sendStatus(200);
});

rifasRoute.put('/raffles/:raffle/status/check', (req, res) => {
    const { raffle } = req.params;
    RifasController.checkStatus(raffle);
    res.sendStatus(200);
});

module.exports = rifasRoute;