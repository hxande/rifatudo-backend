const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

// Table cotas
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// id_rifa varchar(255)
// id_usuario varchar(255)
// num varchar(255)
// valor varchar(255)
// status varchar(255)

exports.insertCotas = function (data, callback) {
    db.run(`INSERT INTO cotas (id_rifa, id_usuario, num, valor, status) VALUES(?,?,?,?,?)`,
        [data.id_rifa, data.id_usuario, data.num, data.valor, data.status],
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

exports.selectAllCotas = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM cotas', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdCotas = function (idCotas, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM cotas WHERE ID == ${idCotas}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdRifas = function (idRifas, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM cotas WHERE id_rifa == ${idRifas}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteCotas = function (idCotas) {
    db.run(`DELETE FROM cotas WHERE ID == ${idCotas}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
