const { Router } = require('express');
const db = require('../db.js');
const UsersController = require('../controllers/UsersController');

const usersRoute = Router();

usersRoute.get('/users', async (req, res) => {
    try {
        const client = await db.connect();
        const response = await client.query('SELECT * FROM tb_users');
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [USERS]', error);
    }
});

usersRoute.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_users WHERE id = ${id}`);
        client.release();
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [USER]', error);
    }
});

usersRoute.post('/users', async (req, res) => {
    const data = req.body;
    const sql = 'SELECT * FROM tb_users WHERE username = ($1) LIMIT 1';
    const values = [data.username];

    try {
        const client = await db.connect();
        const response = await client.query(sql, values);

        if (response.rowCount > 0) {
            res.sendStatus(422);
        } else {
            await UsersController.insertUser(data);
            res.sendStatus(200);
        }

    } catch (error) {
        console.log('Erro [POST] [USERS]', error);
    }
});

usersRoute.post('/users/auth', async (req, res) => {
    const { username, password } = req.body;

    try {
        UsersController.authUser(username, password, res);
    } catch (error) {
        console.log('Erro [AUTH] [USERS]', error);
    }
});

module.exports = usersRoute;
