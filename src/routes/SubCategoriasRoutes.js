const { Router } = require('express');
const SubCategorias = require('../controllers/SubCategoriasController');

subCategoriasRoute = Router();

// USUARIOS
subCategoriasRoute.get('/subcategories', (req, res) => {
    function callback(row) {
        res.json(row);
    }
    SubCategorias.selectAllSubCategorias(callback);
});

subCategoriasRoute.get('/subcategories/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    SubCategorias.selectIdSubCategorias(id, callback);
});

subCategoriasRoute.post('/subcategories', (req, res) => {
    console.log(req);
    const { data } = req.body;
    function callback(row) {
        console.log(row);
        // res.json(row);
    }
    SubCategorias.insertSubCategorias(data, callback);

    res.sendStatus(200);
});

subCategoriasRoute.delete('/subcategories/:id', (req, res) => {
    const { id } = req.params;
    SubCategorias.deleteSubCategorias(id);

    res.sendStatus(200);
});

module.exports = subCategoriasRoute;