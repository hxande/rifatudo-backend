const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const path = require('path');

const http = require('http');
const enderecosRoutes = require('./routes/EnderecosRoutes');
const usuariosRoutes = require('./routes/UsuariosRoutes');
const subcategoriasRoutes = require('./routes/SubCategoriasRoutes');
const categoriasRoutes = require('./routes/CategoriasRoutes');
const rifasRoutes = require('./routes/RifasRoutes');
const cotasRoutes = require('./routes/CotasRoutes');
const imagensRoutes = require('./routes/ImagensRoutes');
const pagamentosRoutes = require('./routes/PagamentosRoutes');

require('./config/getEnv')();

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("ejs", engines.ejs);
app.set('views', path.join(__dirname, './views'));
app.set("view engine", "ejs");

app.use(enderecosRoutes);
app.use(usuariosRoutes);
app.use(categoriasRoutes);
app.use(subcategoriasRoutes);
app.use(rifasRoutes);
app.use(cotasRoutes);
app.use(imagensRoutes);
app.use('/payments', pagamentosRoutes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

server.listen(process.env.API_PORT);