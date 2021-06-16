const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const db = require('../db.js');
const multerConfig = require("../config/multer");

const imagesRoute = Router();

// const config = {
//     storage: multer.diskStorage({
//         destination: path.resolve(__dirname, '..', 'uploads'),
//         filename(request, file, callback) {
//             const hash = crypto.randomBytes(6).toString('hex');
//             const fileName = `${hash}-${file.originalname}`;
//             callback(null, fileName);
//         }
//     }),
// }
// const upload = multer(config);

imagesRoute.get('/raffles/:id/images', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM tb_images WHERE id_raffle = ${id}`);
        client.release();
        response.rows.map(row => {
            row.file = `http://rifatudo.s3-website-us-east-1.amazonaws.com/${row.file}`
        })
        res.json(response.rows);
    } catch (error) {
        console.log('Erro [GET] [IMAGES]', error);
    }
});

// imagesRoute.post('/raffles/:id/images/:num', upload.single('image'), async (req, res) => {
imagesRoute.post('/raffles/:id/images/:num', multer(multerConfig).single('image'), async (req, res) => {

    const { id, num } = req.params;
    // const data = req.file.filename;
    const { originalname: name, size, key, location: url = "" } = req.file;

    const sql = 'INSERT INTO tb_images (id_raffle, num, file) VALUES($1, $2, $3)';
    const values = [id, num, key];

    try {
        const client = await db.connect();
        const response = await client.query(sql, values);
        client.release();
        res.sendStatus(200);
    } catch (error) {
        console.log('Erro [POST] [IMAGE]', error);
    }
});

imagesRoute.post('/raffles/:id/quotas/:quotas/receipt', upload.single('image'), async (req, res) => {
    const { id, quotas } = req.params;
    const data = id + '-' + quotas + '-' + req.file.filename;

    const sql = 'INSERT INTO tb_images (id_raffle, num, file) VALUES($1, $2, $3)';
    const values = [id, 0, data];

    try {
        const client = await db.connect();
        const response = await client.query(sql, values);
        client.release();
        res.sendStatus(200);
    } catch (error) {
        console.log('Erro [POST] [IMAGE RECEIPT]', error);
    }
});

module.exports = imagesRoute;