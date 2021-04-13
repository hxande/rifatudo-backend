const express = require('express');
const authMiddleware = require('../auth');
const PaymentsController = require('../controllers/PaymentsController');

const paymentsRoute = express.Router();

paymentsRoute.get('/checkout/:id/:email/:description/:amount', PaymentsController.checkout);

paymentsRoute.get('/success', (req, res) => {
    return res.render('sucessoScreen')
});

paymentsRoute.get('/pending', (req, res) => {
    return res.render('pendenteScreen')
});

paymentsRoute.get('/failure', (req, res) => {
    return res.render('falhaScreen')
});

paymentsRoute.post('/pay', authMiddleware, async (req, res) => {
    const data = req.body;

    try {
        const response = await PaymentsController.pay(data, res);
    } catch (error) {
        console.log('Erro [POST] [PAYMENTS]', error);
    }
});

module.exports = paymentsRoute;