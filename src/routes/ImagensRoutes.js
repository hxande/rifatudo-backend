const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const db = require('../db.js');
const ImagensController = require('../controllers/ImagensController');

const imagensRoute = Router();

const config = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${hash}-${file.originalname}`;
            callback(null, fileName);
        }
    }),
}
const upload = multer(config);

imagensRoute.post('/raffles/:id/images/:num', upload.single('image'), async (req, res) => {
    const { id, num } = req.params;
    const data = req.file.filename;

    const sql = 'INSERT INTO tb_images (id_raffle, num, file) VALUES($1, $2, $3)';
    const values = [id, num, data];

    try {
        const client = await db.connect();
        const response = await client.query(sql, values);
        client.release();
        res.sendStatus(200);
    } catch (error) {
        console.log('Erro [POST] [IMAGE]', error);
    }
});





imagensRoute.get('/imagens/:id', (req, res) => {
    const { id } = req.params;
    function callback(row) {
        res.json(row);
    }
    ImagensController.selectIdImagens(id, callback);
});

imagensRoute.get('/rifas/:id/imagens', (req, res) => {
    const { id } = req.params;
    function callback(rows) {
        rows.map(row => {
            row.image_url = `http://192.168.0.10:3333/uploads/${row.conteudo}`
        })
        res.json(rows);
    }
    ImagensController.selectIdRifas(id, callback);
});

imagensRoute.post('/rifas/:id/imagens/:num', upload.single('image'), (req, res) => {
    const { id, num } = req.params;
    const data = req.file.filename;
    ImagensController.insertImagens(id, num, data);

    res.sendStatus(200);
});

imagensRoute.post('/raffles/:raffle/quotas/:quotas/receipt', upload.single('image'), (req, res) => {
    const { raffle, quotas } = req.params;
    const data = raffle + '-' + quotas + '-' + req.file.filename;
    ImagensController.insertImagens(raffle, 0, data);

    res.sendStatus(200);
});

module.exports = imagensRoute;