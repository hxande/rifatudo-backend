const express = require('express');
const cors = require('cors');
const http = require('http');
const enderecosRoutes = require('./routes/EnderecosRoutes');

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(enderecosRoutes);

server.listen(3333);