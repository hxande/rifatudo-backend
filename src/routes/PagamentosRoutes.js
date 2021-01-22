const express = require('express');
const PagamentosController = require('../controllers/PagamentosController');

const pagamentosRoute = express.Router();

pagamentosRoute.get('/checkout/:id/:email/:description/:amount', PagamentosController.checkout);

pagamentosRoute.get('/success', (req, res) => {
    return res.render('sucessoScreen')
});

pagamentosRoute.get('/pending', (req, res) => {
    return res.render('pendenteScreen')
});

pagamentosRoute.get('/failure', (req, res) => {
    return res.render('falhaScreen')
});

module.exports = pagamentosRoute;