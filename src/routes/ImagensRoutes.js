const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { Router } = require('express');
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

// imagensRoute.delete('/Imagens/:id', (req, res) => {
//     const { id } = req.params;
//     ImagensController.deleteImagens(id);

//     res.sendStatus(200);
// });

module.exports = imagensRoute;