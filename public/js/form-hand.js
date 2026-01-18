document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (submitBtn.disabled) return;

  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    alert('Confirmá que no sos un robot 🤖');
    return;
  }

  const name = document.getElementById('name').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const submitBtn = document.getElementById('enviar');

  /* REGEX */
const phoneRegex = /^\+?[0-9\s\-]{8,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateForm() {
  let isValid = true;

  /* Nombre */
  if (nameInput.value.trim().length < 3) {
    showError('name', 'Mínimo 3 caracteres');
    isValid = false;
  } else hideError('name');

  /* Teléfono */
  if (!phoneRegex.test(whatsappInput.value.trim())) {
    showError('whatsapp', 'Teléfono inválido');
    isValid = false;
  } else hideError('whatsapp');

  /* Email */
  if (!emailRegex.test(emailInput.value.trim())) {
    showError('email', 'Email inválido');
    isValid = false;
  } else hideError('email');

  /* Mensaje */
  if (messageInput.value.trim().length < 10) {
    showError('message', 'Mínimo 10 caracteres');
    isValid = false;
  } else hideError('message');

  submitBtn.disabled = !isValid;
}

function showError(field, message) {
  const errorEl = document.getElementById(`error-${field}`);
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function hideError(field) {
  const errorEl = document.getElementById(`error-${field}`);
  errorEl.style.display = 'none';
}

/* Escuchar cambios */
[nameInput, whatsappInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', validateForm);
});

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
