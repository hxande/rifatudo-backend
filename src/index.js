const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const path = require('path');
const cron = require('cron').CronJob;

const http = require('http');
const enderecosRoutes = require('./routes/EnderecosRoutes');
const usuariosRoutes = require('./routes/UsuariosRoutes');
const subcategoriasRoutes = require('./routes/SubCategoriasRoutes');
const categoriasRoutes = require('./routes/CategoriasRoutes');
const rifasRoutes = require('./routes/RifasRoutes');
const cotasRoutes = require('./routes/CotasRoutes');
const imagensRoutes = require('./routes/ImagensRoutes');
const pagamentosRoutes = require('./routes/PagamentosRoutes');
const statementsRoutes = require('./routes/StatementsRoutes');
const resultsRoutes = require('./routes/ResultsRoutes');
const disputesRoutes = require('./routes/DisputesRoutes');

require('./config/getEnv')();

const job = new cron('0 2 15 * * *', function () {
    console.log('You will see this message every second');
}, null, true, 'America/Sao_Paulo');
job.start();

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('ejs', engines.ejs);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(enderecosRoutes);
app.use(usuariosRoutes);
app.use(categoriasRoutes);
app.use(subcategoriasRoutes);
app.use(rifasRoutes);
app.use(cotasRoutes);
app.use(imagensRoutes);
app.use(statementsRoutes);
app.use(resultsRoutes);
app.use(disputesRoutes);
app.use('/payments', pagamentosRoutes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

server.listen(process.env.API_PORT);