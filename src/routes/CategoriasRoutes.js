const { Router } = require('express');
const CategoriasController = require('../controllers/CategoriasController');

categoriasRoute = Router();

// USUARIOS
categoriasRoute.get('/categories', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    CategoriasController.selectAllCategorias(callback);
});

categoriasRoute.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    CategoriasController.selectIdCategorias(id, callback);
});

categoriasRoute.post('/categories', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    CategoriasController.insertCategorias(data, callback);

    res.sendStatus(200);
});

categoriasRoute.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    CategoriasController.deleteCategorias(id);

    res.sendStatus(200);
});

module.exports = categoriasRoute;