const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/db/rifatudo');

const TABELA_USUARIOS =
  'CREATE TABLE usuarios (ID INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255), password varchar(255), email varchar(255), nome varchar(255), sobrenome varchar(255), data_nascimento varchar(255), sexo varchar(255), cpf varchar(255), id_endereco varchar(255))'
db.run(TABELA_USUARIOS);

const TABELA_ENDERECOS =
  'CREATE TABLE enderecos (ID INTEGER PRIMARY KEY AUTOINCREMENT, cep varchar(255), estado varchar(255), cidade varchar(255), bairro varchar(255), endereco varchar(255), numero varchar(255), lat varchar(255), long varchar(255))'
db.run(TABELA_ENDERECOS);

db.close();