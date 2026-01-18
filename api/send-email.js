import emailjs from '@emailjs/nodejs';
import cors from 'cors';


emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
});

export default async function handler(req, res) {
  cors()(req, res, async () => {

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    const { name, whatsapp, email, message, recaptchaToken } = req.body;

        /* ==========================
       VALIDACIONES BACKEND
       (ANTES de reCAPTCHA)
    ========================== */
     // Nombre
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: 'Nombre inválido' });
    }

    // Email (ACÁ va el emailRegex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Teléfono
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (!phoneRegex.test(whatsapp)) {
      return res.status(400).json({ message: 'Teléfono inválido' });
    }

    // Mensaje
    if (!message || message.trim().length < 15) {
      return res.status(400).json({ message: 'Mensaje muy corto' });
    }


    if (!recaptchaToken) {
      return res.status(400).json({ message: 'reCAPTCHA faltante' });
    }

    /* 🔐 VALIDACIÓN reCAPTCHA */
    const googleRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const captchaResult = await googleRes.json();

    if (!captchaResult.success) {
      return res.status(403).json({ message: 'reCAPTCHA inválido' });
    }

    /* 📧 ENVÍO EMAIL */
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
