const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
let db = new sqlite3.Database(dbPath);

// Table subcategorias
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// id_categoria varchar(255)
// nome varchar(255)


exports.insertSubCategorias = function (data, callback) {
    db.run(`INSERT INTO subcategorias (id_categoria, nome) VALUES(?,?)`,
        [data.id_categoria, data.nome],
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

exports.selectAllSubCategorias = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM subcategorias', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdSubCategorias = function (idSubcategorias, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM subcategorias WHERE ID == ${idSubcategorias}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteSubCategorias = function (idSubcategorias) {
    db.run(`DELETE FROM subcategorias WHERE ID == ${idSubcategorias}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
