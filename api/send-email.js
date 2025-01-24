import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, whatsapp, email, message } = req.body;

    const userId = muvP16-LeD4NwM6la; // Tu User ID de EmailJS
    const serviceId = service_dsna02d; // Tu Service ID de EmailJS
    const templateId = template_iew81gs; // Tu Template ID de EmailJS

    try {
      // Enviar el correo usando los datos recibidos del formulario
      const response = await emailjs.send(serviceId, templateId, {
        user_name: name,
        user_whatsapp: whatsapp,
        user_email: email,
        user_message: message
      }, userId);

      console.log('Email enviado:', response);
      res.status(200).json({ message: '¡Correo enviado con éxito!' });
    } catch (error) {
      console.error('Error enviando el email:', error);
      res.status(500).json({ message: 'Hubo un error al enviar el correo' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
