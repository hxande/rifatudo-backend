const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
let db = new sqlite3.Database(dbPath);

exports.insertUsuarios = function (data, callback) {
    db.run(`INSERT INTO usuarios (username, password, email, nome, sobrenome, data_nascimento, sexo, cpf, id_endereco) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.username, data.password, data.email, data.nome, data.sobrenome, data.data_nascimento, data.sexo, data.cpf, data.id_endereco],
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

exports.selectAllUsuarios = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM usuarios', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdUsuarios = function (idUsuarios, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM usuarios WHERE ID == ${idUsuarios}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteUsuarios = function (idUsuarios) {
    db.run(`DELETE FROM usuarios WHERE ID == ${idUsuarios}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
