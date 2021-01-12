const express = require('express');
const cors = require('cors');
const path = require('path');

const http = require('http');
const enderecosRoutes = require('./routes/EnderecosRoutes');
const usuariosRoutes = require('./routes/UsuariosRoutes');
const subcategoriasRoutes = require('./routes/SubCategoriasRoutes');
const categoriasRoutes = require('./routes/CategoriasRoutes');
const produtosRoutes = require('./routes/ProdutosRoutes');
const rifasRoutes = require('./routes/RifasRoutes');
const cotasRoutes = require('./routes/CotasRoutes');
const imagensRoutes = require('./routes/ImagensRoutes');

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(enderecosRoutes);
app.use(usuariosRoutes);
app.use(categoriasRoutes);
app.use(produtosRoutes);
app.use(subcategoriasRoutes);
app.use(rifasRoutes);
app.use(cotasRoutes);
app.use(imagensRoutes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

server.listen(3333);