const { Router } = require('express');
const DisputesController = require('../controllers/DisputesController');

const disputesRoute = Router();

disputesRoute.post('/disputes', (req, res) => {
    const { data } = req.body;
    function callback(row) {
        console.log(row);
    }
    DisputesController.insertDisputes(data, callback);

    res.sendStatus(200);
});

disputesRoute.get('/disputes', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    DisputesController.selectAllDisputes(callback);
});

disputesRoute.get('/disputes/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    DisputesController.selectIdDisputes(id, callback);
});

disputesRoute.delete('/disputes/:id', (req, res) => {
    const { id } = req.params;
    DisputesController.deleteDisputes(id);

    res.sendStatus(200);
});

module.exports = disputesRoute;