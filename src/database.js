const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./src/db/rifatudo');

// const TABELA_USUARIOS =
//   'CREATE TABLE usuarios (ID INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255), password varchar(255), email varchar(255), nome varchar(255), sobrenome varchar(255), data_nascimento varchar(255), sexo varchar(255), cpf varchar(255), id_endereco varchar(255))'
// db.run(TABELA_USUARIOS);

// const TABELA_ENDERECOS =
//   'CREATE TABLE enderecos (ID INTEGER PRIMARY KEY AUTOINCREMENT, cep varchar(255), estado varchar(255), cidade varchar(255), bairro varchar(255), endereco varchar(255), numero varchar(255), lat varchar(255), long varchar(255))'
// db.run(TABELA_ENDERECOS);

// const TABELA_CATEGORIAS =
//   'CREATE TABLE categorias (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(255))'
// db.run(TABELA_CATEGORIAS);

// const TABELA_PRODUTOS =
//   'CREATE TABLE produtos (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario varchar(255), nome varchar(255), descricao varchar(255), id_categoria varchar(255), id_subcategoria varchar(255), uf varchar(255), cidade varchar(255), status varchar(255)), Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP'
// db.run(TABELA_PRODUTOS);

const TABELA_RIFAS =
  'CREATE TABLE rifas (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario varchar(255), titulo varchar(255), descricao varchar(255), id_categoria varchar(255), uf varchar(255), cidade varchar(255), status varchar(255), valor varchar(255), qtd_cotas varchar(255), qtd_cotas_g varchar(255), qtd_cotas_m varchar(255), qtd_ganhadores varchar(255), duracao varchar(255), sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)'
db.run(TABELA_RIFAS);

// const TABELA_SUB_CATEGORIAS =
//   'CREATE TABLE subcategorias (ID INTEGER PRIMARY KEY AUTOINCREMENT,id_categoria varchar(255), nome varchar(255))'
// db.run(TABELA_SUB_CATEGORIAS);

// const TABELA_COTAS =
//   'CREATE TABLE cotas (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_rifa varchar(255), id_usuario varchar(255), num varchar(255), valor varchar(255), status varchar(255))'
// db.run(TABELA_COTAS);

db.close();