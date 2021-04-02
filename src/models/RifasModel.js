const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

exports.insertRifas = function (data, callback, callbackParent) {
    db.run(`INSERT INTO rifas (id_usuario, titulo, descricao, id_categoria, uf, cidade, status, valor, qtd_cotas, qtd_cotas_g, qtd_cotas_m, qtd_ganhadores, duracao) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [data.id_usuario, data.titulo, data.descricao, data.id_categoria, data.uf, data.cidade, data.status, data.valor, data.qtd_cotas, data.qtd_cotas_g, data.qtd_cotas_m, data.qtd_ganhadores, data.duracao],
        function (err) {
            if (err) {
                callback(err)
                return console.log(err.message);
            }
            callback(this.lastID, callbackParent)
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
};

exports.selectAllRifas = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM rifas', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectRafflesByPage = function (page, callback) {
    const newRange = (page - 1) * 5;
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE status > 0 LIMIT ${newRange}, 5`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectIdRifas = function (idRifas, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE ID = ${idRifas}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectMyRifas = function (idUsuarios, callback) {
    db.serialize(function () {
        db.all(`SELECT a.ID, a.titulo, a.status, a.duracao, SUM(b.valor) soma, COUNT(b.status) contagem FROM rifas a INNER JOIN cotas b ON a.ID = b.id_rifa WHERE b.status = 0 AND a.id_usuario = ${idUsuarios}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.deleteRifas = function (idRifas) {
    db.run(`DELETE FROM rifas WHERE ID = ${idRifas}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
};

exports.selectRafflesQttMin = function (raffle, callback) {
    db.serialize(function () {
        db.get(`SELECT qtd_cotas_m FROM rifas WHERE ID = ${raffle}`, function (err, row) {
            if (err != null) {
                console.log(err);
            }
            callback(row);
        });
    });
};

exports.updateRafflesStatus = function (raffle, status) {
    db.run(`UPDATE rifas SET status = ${status}, update_sqltime = datetime('now') WHERE ID = ${raffle}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
};
