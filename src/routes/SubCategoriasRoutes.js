const { Router } = require('express');
const SubCategoriasController = require('../controllers/SubCategoriasController');

const subCategoriasRoute = Router();

subCategoriasRoute.get('/subcategories', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    SubCategoriasController.selectAllSubCategorias(callback);
});

subCategoriasRoute.get('/subcategories/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    SubCategoriasController.selectIdSubCategorias(id, callback);
});

subCategoriasRoute.post('/subcategories', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
    }
    SubCategoriasController.insertSubCategorias(data, callback);

    res.sendStatus(200);
});

subCategoriasRoute.delete('/subcategories/:id', (req, res) => {
    const { id } = req.params;
    SubCategoriasController.deleteSubCategorias(id);

    res.sendStatus(200);
});

module.exports = subCategoriasRoute;