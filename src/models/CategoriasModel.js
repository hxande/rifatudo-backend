const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

// Table categorias
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// nome varchar(255)

exports.insertCategorias = function (data, callback) {
    db.run(`INSERT INTO categorias (nome) VALUES(?)`,
        [data.nome],
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

exports.selectAllCategorias = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM categorias', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdCategorias = function (idCategorias, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM categorias WHERE ID == ${idCategorias}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteCategorias = function (idCategorias) {
    db.run(`DELETE FROM categorias WHERE ID == ${idCategorias}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
