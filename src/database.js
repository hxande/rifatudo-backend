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

// const TABELA_RIFAS =
//   'CREATE TABLE rifas (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario varchar(255), titulo varchar(255), descricao varchar(255), id_categoria varchar(255), uf varchar(255), cidade varchar(255), status varchar(255), valor varchar(255), qtd_cotas varchar(255), qtd_cotas_g varchar(255), qtd_cotas_m varchar(255), qtd_ganhadores varchar(255), duracao varchar(255), sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, update_sqltime TIMESTAMP)'
// db.run(TABELA_RIFAS);

// const TABELA_SUB_CATEGORIAS =
//   'CREATE TABLE subcategorias (ID INTEGER PRIMARY KEY AUTOINCREMENT,id_categoria varchar(255), nome varchar(255))'
// db.run(TABELA_SUB_CATEGORIAS);

// const TABELA_COTAS =
//   'CREATE TABLE cotas (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_rifa varchar(255), id_usuario varchar(255), num varchar(255), valor varchar(255), status varchar(255))'
// db.run(TABELA_COTAS);

// const TABELA_PAGAMENTOS =
//   'CREATE TABLE pagamentos (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario varchar(255), id_rifa varchar(255), cotas varchar(255), metodo_pagamento varchar(255), valor varchar(255), sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)'
// db.run(TABELA_PAGAMENTOS);

// const TABELA_MOVIMENTACOES =
//   'CREATE TABLE movimentacoes (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario varchar(255), tipo_transacao varchar(255), valor varchar(255), sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)'
// db.run(TABELA_MOVIMENTACOES);

// const TABELA_TIPO_STATUS_RIFAS =
//   'CREATE TABLE tipo_status_rifas (ID INTEGER PRIMARY KEY AUTOINCREMENT, codigo varchar(255), nome varchar(255))'
// db.run(TABELA_TIPO_STATUS_RIFAS);

// const TABELA_TIPO_STATUS_COTAS =
//   'CREATE TABLE tipo_status_cotas (ID INTEGER PRIMARY KEY AUTOINCREMENT, codigo varchar(255), nome varchar(255))'
// db.run(TABELA_TIPO_STATUS_COTAS);

// const TABELA_RESULTADOS_SORTEIO =
//     'CREATE TABLE resultados_sorteio (ID INTEGER PRIMARY KEY AUTOINCREMENT, data varchar(255), sorteio1 varchar(255), sorteio2 varchar(255), sorteio3 varchar(255), sorteio4 varchar(255), sorteio5 varchar(255), sorteio6 varchar(255), sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)'
// db.run(TABELA_RESULTADOS_SORTEIO);

// const TABELA_DISPUTAS =
//     'CREATE TABLE disputas (ID INTEGER PRIMARY KEY AUTOINCREMENT, id_comprador varchar(255), id_vendedor varchar(255), id_rifa varchar(255), id_cota varchar(255), status varchar(255), sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)'
// db.run(TABELA_DISPUTAS);

db.close();