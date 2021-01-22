const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

exports.insertImagens = function (idRifas, num, data, callback) {
    db.run(`INSERT INTO imagens (id_rifa, num, conteudo) VALUES(?,?,?)`,
        [idRifas, num, data],
        function (err) {
            if (err) {
                callback(err)
                return console.log(err.message);
            }
            callback(this.lastID);
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
};

exports.selectAllImagens = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM imagens', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectIdImagens = function (idImagens, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM imagens WHERE ID = ${idImagens}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectIdRifas = function (idRifas, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM imagens WHERE id_rifa = ${idRifas}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.deleteImagens = function (idImagens) {
    db.run(`DELETE FROM imagens WHERE ID = ${idImagens}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
};