

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST', // Asegúrate de que el método sea POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, whatsapp, email, message }),
    });

    if (response.ok) {
      // Ocultar el popup de contacto
      document.getElementById('contactPopup').style.display = 'none';
      // Mostrar el popup de éxito
      document.getElementById('successPopup').style.display = 'block';
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar el mensaje: ' + error.message);
  }
});
