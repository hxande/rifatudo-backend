const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

exports.insertStatements = function (data, type, callback) {
    db.run(`INSERT INTO movimentacoes (id_usuario, tipo_transacao, valor) VALUES(?,?,?)`,
        [data.user, type, data.valor],
        function (err) {
            if (err) {
                callback(err)
                return console.log(err.message);
            }
            callback(this.lastID)
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
};

exports.selectAllStatements = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM movimentacoes', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectStatementsById = function (idStatement, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM movimentacoes WHERE ID = ${idStatement}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectTotalValueByUser = function (idUser, callback) {
    db.serialize(function () {
        db.all(`SELECT SUM(valor) total FROM movimentacoes WHERE id_usuario = ${idUser}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.deleteStatements = function (idStatement) {
    db.run(`DELETE FROM movimentacoes WHERE ID = ${idStatement}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
};
