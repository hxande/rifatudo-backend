const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/db/rifatudo');

const TABELA_ENDERECOS =
  'CREATE TABLE enderecos (ID INTEGER PRIMARY KEY AUTOINCREMENT, cep varchar(255), estado varchar(255), cidade varchar(255), bairro varchar(255), endereco varchar(255), numero varchar(255), lat varchar(255), long varchar(255))'
db.run(TABELA_ENDERECOS);

db.close();