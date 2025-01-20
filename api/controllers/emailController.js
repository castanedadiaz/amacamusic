const emailjs = require('emailjs-com');

exports.sendEmail = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, whatsapp, email, message } = req.body;

    const templateParams = {
        name: name,
        whatsapp: whatsapp,
        email: email,
        message: message
    };

    try {
        console.log('Environment Variables:', {
            EMAILJS_USER: process.env.EMAILJS_USER,
            EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID
        });
        console.log('Sending email with params:', templateParams);
        const response = await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams, process.env.EMAILJS_USER);
        console.log('SUCCESS!', response.status, response.text);
        res.status(200).send('Mensaje enviado con éxito');
    } catch (err) {
        console.error('FAILED...', err);
        res.status(500).send('Error al enviar el mensaje');
    }
};