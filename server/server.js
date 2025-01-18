const express = require('express');
const bodyParser = require('body-parser');
const emailjs = require('emailjs-com');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Configurar EmailJS
emailjs.init(process.env.EMAILJS_USER); // Inicializar EmailJS con el userID

app.post('/send-email', (req, res) => {
    const { name, whatsapp, email, message } = req.body;

    const templateParams = {
        name: name,
        whatsapp: whatsapp,
        email: email,
        message: message
    };

    emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            res.status(200).send('Mensaje enviado con éxito');
        }, (err) => {
            console.error('FAILED...', err);
            res.status(500).send('Error al enviar el mensaje');
        });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});