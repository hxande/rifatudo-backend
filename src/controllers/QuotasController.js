const db = require('../db.js');

exports.insertQuota = async function (data) {
    const sql = 'INSERT INTO tb_quotas (id_raffle, id_user, num, status, value) VALUES($1, $2, $3, $4, $5)';
    const values = [data.id_raffle, data.id_user, data.num, data.status, data.value];

    const client = await db.connect();
    const response = await client.query(sql, values);
    client.release();
};