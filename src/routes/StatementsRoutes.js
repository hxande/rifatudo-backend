const { Router } = require('express');
const db = require('../db.js');

const statementsRoute = Router();

statementsRoute.get('/statements', async (req, res) => {
    try {
        const client = await db.connect();
        const response = await client.query('SELECT * FROM tb_statements ORDER BY created_at');
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [STATEMENTS]', error);
    }
});

module.exports = statementsRoute;