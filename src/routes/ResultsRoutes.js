const { Router } = require('express');
const ResultsController = require('../controllers/ResultsController');

const resultsRoute = Router();

resultsRoute.get('/results/lasted', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    ResultsController.selectLastResults(callback);
});

resultsRoute.get('/results', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    ResultsController.selectAllResults(callback);
});

resultsRoute.get('/results/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    ResultsController.selectIdResults(id, callback);
});

resultsRoute.delete('/results/:id', (req, res) => {
    const { id } = req.params;
    ResultsController.deleteResults(id);

    res.sendStatus(200);
});

module.exports = resultsRoute;