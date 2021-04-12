const { Router } = require('express');
const db = require('../db.js');
const authMiddleware = require('../auth');
const CotasController = require('../controllers/CotasController');

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







// cotasRoute.get('/rifas/:id/cotas/status/:status/contagem', (req, res) => {
//     const { id, status } = req.params;
//     function callback(rows) {
//         res.json(rows);
//     }
//     CotasController.selectCountCotasStatus(id, status, callback);
// });

// cotasRoute.post('/users/:user/rifas/:id/cotas/comprar', authMiddleware, (req, res) => {
//     const { data } = req.body;
//     const { user } = req.params;
//     CotasController.payCotas(user, data);

//     res.sendStatus(200);
// });

// cotasRoute.put('/raffles/:raffle/quotas/status/:status', authMiddleware, (req, res) => {
//     const { raffle, status } = req.params;
//     try {
//         CotasController.updateStatusQuotas(raffle, status, req.body, res);
//     } catch (error) {
//         console.log(error);
//     }
// });

// cotasRoute.put('/raffles/:raffle/quotas/:quota/status/:status', authMiddleware, (req, res) => {
//     const { raffle, quota, status } = req.params;
//     try {
//         CotasController.updateStatus(raffle, status, quota, res);
//     } catch (error) {
//         console.log(error);
//     }
// });


module.exports = quotasRoute;