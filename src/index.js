const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const path = require('path');
const cron = require('cron').CronJob;
const http = require('http');

const usersRoute = require('./routes/UsersRoutes');
const rafflesRoute = require('./routes/RafflesRoutes');
const quotasRoute = require('./routes/QuotasRoutes');
const categoriesRoutes = require('./routes/CategoriesRoutes');
const imagesRoutes = require('./routes/ImagesRoutes');
const statementsRoutes = require('./routes/StatementsRoutes');
const paymentsRoutes = require('./routes/PaymentsRoutes');

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

app.use(usersRoute);
app.use(rafflesRoute);
app.use(quotasRoute);
app.use(categoriesRoutes);
app.use(imagesRoutes);
app.use(categoriesRoutes);
app.use(statementsRoutes);

app.use('/payments', paymentsRoutes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

server.listen(process.env.PORT || 3333);