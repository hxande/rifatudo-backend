const { Router } = require('express');
const db = require('../db.js');

const categoriesRoute = Router();

categoriesRoute.get('/categories', async (req, res) => {
    try {
        const client = await db.connect();
        const response = await client.query('SELECT * FROM tb_categories');
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [CATEGORIES]', error);
    }
});

module.exports = categoriesRoute;