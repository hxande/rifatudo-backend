const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
let db = new sqlite3.Database(dbPath);

// Table rifas
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// id_categoria varchar(255)
// valor varchar(255)
// qtd_cotas varchar(255)
// qtd_cotas_g varchar(255)
// qtd_cotas_m varchar(255)
// qtd_ganhadores varchar(255)
// duracao varchar(255)

exports.insertRifas = function (data, callback) {
    db.run(`INSERT INTO rifas (id_produto, valor, qtd_cotas, qtd_cotas_g, qtd_cotas_m, qtd_ganhadores, duracao) VALUES(?,?,?,?,?,?,?)`,
        [data.id_produto, data.valor, data.qtd_cotas, data.qtd_cotas_g, data.qtd_cotas_m, data.qtd_ganhadores, data.duracao],
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

exports.selectAllRifas = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM rifas', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdRifas = function (idRifas, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE ID == ${idRifas}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteRifas = function (idRifas) {
    db.run(`DELETE FROM rifas WHERE ID == ${idRifas}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
