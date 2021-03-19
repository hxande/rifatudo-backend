const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

exports.insertPayments = function (data, callback) {
    db.run(`INSERT INTO pagamentos (id_usuario, id_rifa, cotas, metodo_pagamento, valor) VALUES(?,?,?,?,?)`,
        [data.user, data.raffle, data.quotas, data.method, data.valor],
        function (err) {
            if (err) {
                callback(err);
                return console.log(err.message);
            }
            callback(this.lastID);
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
};
