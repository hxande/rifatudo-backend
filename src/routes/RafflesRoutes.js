const { Router } = require('express');
const db = require('../db.js');
const RafflesController = require('../controllers/RafflesController');
const mailService = require('../config/mail');
const mailNewRaffle = require('../assets/mails/mail_newRaffle');

const rafflesRoute = Router();

rafflesRoute.get('/raffles', async (req, res) => {
    try {
        const client = await db.connect();
        const response = await client.query('SELECT * FROM tb_raffles');
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [RAFFLES]', error);
    }
});

rafflesRoute.get('/raffles/:id', async (req, res) => {
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

rafflesRoute.get('/raffles/users/:id', async (req, res) => {
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

rafflesRoute.get('/raffles/pages/:page', async (req, res) => {
    const { page } = req.params;

    try {
        RafflesController.selectRafflesByPage(page, res);
    } catch (error) {
        console.log('Erro [GET] [RAFFLES PAGES]', error);
    }
});

rafflesRoute.post('/raffles', async (req, res) => {
    const data = req.body;

    try {
        const response = await RafflesController.insertRaffle(data);
        mailService(data.mail, `RIFATUDO - Rifa Criada #${response.rows[0].id}`, mailNewRaffle());
        res.json(response);
    } catch (error) {
        console.log('Erro [POST] [RAFFLES]', error);
    }
});

module.exports = rafflesRoute;
