const { Router } = require('express');
const CategoriasController = require('../controllers/CategoriasController');

categoriasRoute = Router();

// CATEGORIAS
categoriasRoute.get('/categorias', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    CategoriasController.selectAllCategorias(callback);
});

categoriasRoute.get('/categorias/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    CategoriasController.selectIdCategorias(id, callback);
});

categoriasRoute.post('/categorias', (req, res) => {
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    CategoriasController.insertCategorias(data, callback);

    res.sendStatus(200);
});

categoriasRoute.delete('/categorias/:id', (req, res) => {
    const { id } = req.params;
    CategoriasController.deleteCategorias(id);

    res.sendStatus(200);
});

module.exports = categoriasRoute;