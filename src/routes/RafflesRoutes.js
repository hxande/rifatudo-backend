const { Router } = require('express');
const db = require('../db.js');
const RifasController = require('../controllers/RifasController');

const rafflesRoute = Router();

rafflesRoute.get('/rafflesP', async (req, res) => {
    try {
        const client = await db.connect();
        const response = await client.query('SELECT * FROM tb_raffles');
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [RAFFLES]', error);
    }
});

rafflesRoute.get('/rafflesP/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_raffles WHERE id = ${id}`);
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [RAFFLE]', error);
    }
});

rafflesRoute.get('/rafflesP/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_raffles WHERE id_user = ${id}`);
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [RAFFLES USER]', error);
    }
});

rafflesRoute.get('/rafflesP/pages/:page', async (req, res) => {
    const { page } = req.params;
    const newRange = (page - 1) * 5;

    const sql = `SELECT * FROM tb_raffles WHERE status > 0 ORDER BY created_at LIMIT 5 OFFSET ${newRange}`;

    try {
        const client = await db.connect();
        const response = await client.query(sql);
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [RAFFLES PAGES]', error);
    }
});

rafflesRoute.post('/raffles', async (req, res) => {
    const data = req.body;

    try {
        const response = await RifasController.insertRaffle(data);
        res.json(response);
    } catch (error) {
        console.log('Erro [POST] [RAFFLES]', error);
    }
});

module.exports = rafflesRoute;
