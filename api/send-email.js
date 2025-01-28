import emailjs from '@emailjs/nodejs';
import cors from 'cors';

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
});

export default async function handler(req, res) {
  // Configura CORS manualmente si es necesario
  cors()(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    const { name, whatsapp, email, message } = req.body;

    try {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        { name, whatsapp, email, message }
      );

      res.status(200).json({ message: 'Mensaje enviado con éxito.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje.' });
    }
  });
}