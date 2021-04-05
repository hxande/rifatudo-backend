const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

exports.insertDisputes = function (data, callback) {
    db.run(`INSERT INTO disputas (id_comprador, id_vendedor, id_rifa, id_cota, status) VALUES(?,?,?,?,?)`,
        [data.id_comprador, data.id_vendedor, data.id_rifa, data.id_cota, 0],
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

exports.selectAllDisputes = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM disputas', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.selectIdDisputes = function (idDisputes, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM disputas WHERE ID = ${idDisputes}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
};

exports.deleteDisputes = function (idDisputes) {
    db.run(`DELETE FROM disputas WHERE ID = ${idDisputes}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
};
