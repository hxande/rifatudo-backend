const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db.js');

exports.insertUser = async function (data) {
    const encrypted = await bcrypt.hash(data.pass, 8);
    data.pass = encrypted;

    const sql = 'INSERT INTO tb_users (username, pass, email, first_name, surname, birth, sex, cpf) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [data.username, data.pass, data.email, data.first_name, data.surname, data.birth, data.sex, data.cpf];

    const client = await db.connect();
    const response = await client.query(sql, values);
    client.release();

    return response;
};

exports.authUser = async function (username, pass, res) {
    const sql = `SELECT * FROM tb_users WHERE LOWER(username) = LOWER('${username}')`;

    const client = await db.connect();
    const response = await client.query(sql);
    client.release();

    if (response.rowCount > 0) {
        if (await bcrypt.compare(String(pass), String(response.rows[0].pass))) {
            const user = {
                id: response.rows[0].id,
                email: response.rows[0].email,
                name: response.rows[0].first_name,
                surname: response.rows[0].surname,
            };
            res.json({
                user,
                token: jwt.sign(user, 'PRIVATEKEY'),
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(404);
    }
};