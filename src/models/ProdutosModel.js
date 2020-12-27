const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/rifatudo');
const db = new sqlite3.Database(dbPath);

// Table produtos
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// id_usuario varchar(255)
// nome varchar(255)
// descricao varchar(255)
// id_categoria varchar(255)
// id_subcategoria varchar(255)
// uf varchar(255)
// cidade varchar(255)
// status varchar(255)

exports.insertProdutos = function (data, callback) {
    db.run(`INSERT INTO produtos (id_usuario, nome, descricao, id_categoria, id_subcategoria, uf, cidade, status) VALUES(?,?,?,?,?,?,?,?)`,
        [data.id_usuario, data.nome, data.descricao, data.id_categoria, data.id_subcategoria, data.uf, data.cidade, data.status],
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

exports.selectAllProdutos = function (callback) {
    db.serialize(function () {
        db.all('SELECT * FROM produtos', function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectIdProdutos = function (idProdutos, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM produtos WHERE ID == ${idProdutos}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteProdutos = function (idProdutos) {
    db.run(`DELETE FROM produtos WHERE ID == ${idProdutos}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}
