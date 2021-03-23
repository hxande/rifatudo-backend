const { Router } = require('express');
const StatementsController = require('../controllers/StatementsController');

const statementsRoute = Router();

statementsRoute.get('/statements', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    StatementsController.selectAllStatements(callback);
});

statementsRoute.get('/statements/:statement', (req, res) => {
    const { statement } = req.params;
    function callback(row) {
        res.json(row);
    }
    StatementsController.selectStatementsById(statement, callback);
});

statementsRoute.get('/statements/total/:user', (req, res) => {
    const { user } = req.params;
    function callback(row) {
        res.json(row);
    }
    StatementsController.selectTotalValueByUser(user, callback);
});

statementsRoute.post('/statements/types/:type', (req, res) => {
    const { type } = req.params;
    function callback(row) {
        console.log(row);
    }
    StatementsController.insertStatements(req.body, type, callback);

    res.sendStatus(200);
});

statementsRoute.delete('/statements/:statement', (req, res) => {
    const { statement } = req.params;
    StatementsController.deleteStatements(statement);

    res.sendStatus(200);
});

module.exports = statementsRoute;