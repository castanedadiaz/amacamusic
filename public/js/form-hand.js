document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    alert('Confirmá que no sos un robot 🤖');
    return;
  }

  const name = document.getElementById('name').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        whatsapp,
        email,
        message,
        recaptchaToken
      }),
    });

    if (response.ok) {
      document.getElementById('contactPopup').style.display = 'none';
      document.getElementById('successPopup').style.display = 'block';
      grecaptcha.reset();
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar el mensaje: ' + error.message);
    grecaptcha.reset();
  }
});
