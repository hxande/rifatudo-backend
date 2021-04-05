const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

exports.selectLastResults = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM resultados_sorteio ORDER BY sqltime DESC LIMIT 1', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectAllResults = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM resultados_sorteio', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectIdResults = function (idResults, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM resultados_sorteio WHERE ID = ${idResults}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.deleteResults = function (idResults) {
    db.run(`DELETE FROM resultados_sorteio WHERE ID = ${idResults}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
};
