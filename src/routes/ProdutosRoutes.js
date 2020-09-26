const { Router } = require('express');
const ProdutosController = require('../controllers/ProdutosController');

produtosRoute = Router();

// USUARIOS
produtosRoute.get('/products', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    ProdutosController.selectAllProdutos(callback);
});

produtosRoute.get('/products/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    ProdutosController.selectIdProdutos(id, callback);
});

produtosRoute.post('/products', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    ProdutosController.insertProdutos(data, callback);

    res.sendStatus(200);
});

produtosRoute.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    ProdutosController.deleteProdutos(id);

    res.sendStatus(200);
});

module.exports = produtosRoute;