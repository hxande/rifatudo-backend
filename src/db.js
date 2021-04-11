exports.connect = async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://qomytwtmbaodtn:c6e765cfe2f6bd4a68ac2782da759e2e95378b4d3cce5822af4174599669720c@ec2-107-22-245-82.compute-1.amazonaws.com:5432/dn0vkfe9fqjen',
        ssl: {
            rejectUnauthorized: false
        }
    });

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

// CREATE TABLE tb_users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) NOT null,
//     pass VARCHAR(255) NOT null,
//     email VARCHAR(255) NOT null,
//     first_name VARCHAR(255) NOT null,
//     surname VARCHAR(255) NOT null,
//     birth DATE NOT null,
//     sex INTEGER NOT null,
//     cpf VARCHAR(255) not null,
//     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
// );

// CREATE TABLE tb_raffles (
//     id SERIAL PRIMARY KEY,
//     id_user INTEGER NOT null,
//     title VARCHAR(100) NOT null,
//     description VARCHAR(255) NOT null,
//     status INTEGER NOT null,
//     value DECIMAL NOT null,
//     id_category INTEGER NOT null,
//     uf VARCHAR(2) NOT null,
//     city VARCHAR(50) NOT null,
//     qtt INTEGER NOT null,
//     qtt_free INTEGER NOT null,
//     qtt_min INTEGER NOT null,
//     qtt_winners INTEGER NOT null,
//     duration INTEGER NOT null,
//     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
// );

// CREATE TABLE tb_quotas (
//     id SERIAL PRIMARY KEY,
//     id_raffle INTEGER NOT null,
//     id_user INTEGER NOT null,
//     num INTEGER NOT null,
//     status INTEGER NOT null,
//     value DECIMAL NOT null,
//     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
// );

// CREATE TABLE tb_categories(
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL
// );