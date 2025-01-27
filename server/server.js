const express = require('express');
const cors = require('cors');
const emailjs = require('@emailjs/nodejs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configura EmailJS
emailjs.init({
  publicKey: 'muvP16-LeD4NwM6la',
  EMAILJS_SERVICE_ID: 'service_66z9neo', 
});

// Ruta para manejar solicitudes POST en /send-email
//
app.post('/send-email', async (req, res) => {
  const { name, whatsapp, email, message } = req.body;

  console.log('Datos recibidos:', { name, whatsapp, email, message }); // Depuración

  try {
    // Envía el correo usando EmailJS
    const emailjsResponse = await emailjs.send(
        'service_66z9neo', // ID del servicio de EmailJS
        'template_iew81gs',  // ID de la plantilla de EmailJS
      {
        name: name, // Asegúrate de que coincida con el placeholder en la plantilla
        whatsapp: whatsapp, // Asegúrate de que coincida con el placeholder en la plantilla
        email: email, // Asegúrate de que coincida con el placeholder en la plantilla
        message: message, // Asegúrate de que coincida con el placeholder en la plantilla
      }
    );

    console.log('Correo enviado:', emailjsResponse); // Depuración
    res.json({ message: 'Mensaje enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error); // Depuración
    res.status(500).json({ message: 'Error al enviar el mensaje.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});