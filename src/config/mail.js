const nodemailer = require('nodemailer');

const remetente = nodemailer.createTransport({
    host: '',
    service: '',
    port: 587,
    secure: true,
    auth: {
        user: 'seuEmail@email.com',
        pass: 'suaSenha'
    }
});

const emailASerEnviado = {
    from: 'seuEmail@email.com',
    to: 'seuDestino@email.com',
    subject: 'Enviando Email com Node.js',
    text: 'Estou te enviando este email com node.js',
};

remetente.sendMail(emailASerEnviado, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado com sucesso.');
    }
});