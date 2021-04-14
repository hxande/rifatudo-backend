const { Router } = require('express');
const db = require('../db.js');
const authMiddleware = require('../auth');

const quotasRoute = Router();

quotasRoute.get('/quotas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_quotas WHERE id = ${id}`);
        client.release();

        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [QUOTA]', error);
    }
});

quotasRoute.get('/raffles/:id/quotas', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_quotas WHERE id_raffle = ${id}`);
        client.release();

        res.json(response.rows.sort((a, b) => (a.num > b.num) ? 1 : ((b.num > a.num) ? -1 : 0)));
    } catch (error) {
        console.log('Erro [GET] [RAFFLE QUOTAS]', error);
    }
});

quotasRoute.get('/users/:id/quotas', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_quotas WHERE id_user = ${id}`);
        client.release();

        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [USER QUOTAS]', error);
    }
});

quotasRoute.put('/quotas/:id/status/:status', authMiddleware, async (req, res) => {
    const { id, status } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`UPDATE tb_quotas SET status = ${status} WHERE id = ${id}`);
        client.release();

        res.json(response.rows);
    } catch (error) {
        console.log('Erro [PUT] [QUOTA STATUS]', error);
    }
});

module.exports = quotasRoute;