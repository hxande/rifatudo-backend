const nodemailer = require('nodemailer');

module.exports = (email, subject, text) => {
    const remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // service: '',
        port: 465,
        secure: true,
        auth: {
            user: 'h.alexandre014@gmail.com',
            pass: '********'
        }
    });

    const emailASerEnviado = {
        from: 'h.alexandre014@gmail.com',
        to: `${email}`,
        subject: `${subject}`,
        html: `${text}`,
    };

    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado com sucesso.');
        }
    });
};