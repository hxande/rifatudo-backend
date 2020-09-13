const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
let db = new sqlite3.Database(dbPath);

// Table enderecos
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// cep varchar(255)
// estado varchar(255)
// cidade varchar(255)
// bairro varchar(255)
// endereco varchar(255)
// numero varchar(255)
// lat varchar(255)
// long varchar(255)

exports.insertEnderecos = function (data, callback) {
    db.run(`INSERT INTO enderecos (cep, estado, cidade, bairro, endereco, numero, lat, long) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.cep, data.estado, data.cidade, data.bairro, data.endereco, data.numero, data.lat, data.long],
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

exports.selectAllEnderecos = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM enderecos', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdEnderecos = function (idEndereco, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM enderecos WHERE ID == ${idEndereco}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteEnderecos = function (idEndereco) {
    db.run(`DELETE FROM enderecos WHERE ID == ${idEndereco}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
