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

statementsRoute.post('/statements', async (req, res) => {
    const data = req.body;

    const sql = 'INSERT INTO tb_statements (id_raffle, id_user, kind, value) VALUES($1, $2, $3, $4)';
    const values = [data.id_raffle, data.id_user, data.kind, data.value];

    try {
        const client = await db.connect();
        const response = await client.query(sql, values);
        client.release();
        res.sendStatus(200);
    } catch (error) {
        console.log('Erro [POST] [STATEMENTS]', error);
    }
});

module.exports = statementsRoute;