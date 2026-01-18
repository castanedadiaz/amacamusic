const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const whatsappInput = document.getElementById('whatsapp');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('enviar');

/* REGEX */
const phoneRegex = /^\+?[0-9\s\-]{8,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function showError(field, message) {
  const errorEl = document.getElementById(`error-${field}`);
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function hideError(field) {
  const errorEl = document.getElementById(`error-${field}`);
  if (!errorEl) return;
  errorEl.style.display = 'none';
}

function validateForm() {
  let isValid = true;

  // Nombre
  if (nameInput.value.trim().length < 3) {
    showError('name', 'Mínimo 3 caracteres');
    isValid = false;
  } else {
    hideError('name');
  }

  // WhatsApp
  if (!phoneRegex.test(whatsappInput.value.trim())) {
    showError('whatsapp', 'Teléfono inválido');
    isValid = false;
  } else {
    hideError('whatsapp');
  }

  // Email
  if (!emailRegex.test(emailInput.value.trim())) {
    showError('email', 'Email inválido');
    isValid = false;
  } else {
    hideError('email');
  }

  // Mensaje
  if (messageInput.value.trim().length < 10) {
    showError('message', 'Mínimo 10 caracteres');
    isValid = false;
  } else {
    hideError('message');
  }

  submitBtn.disabled = !isValid;
}

[nameInput, whatsappInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', validateForm);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (submitBtn.disabled) return;

  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    alert('Confirmá que no sos un robot 🤖');
    return;
  }

  submitBtn.classList.add('loading');
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value,
        whatsapp: whatsappInput.value,
        email: emailInput.value,
        message: messageInput.value,
        recaptchaToken
      }),
    });

    if (!response.ok) throw new Error(await response.text());

    document.getElementById('contactPopup').style.display = 'none';
    document.getElementById('successPopup').style.display = 'block';
    grecaptcha.reset();
  } catch (error) {
    alert('Error al enviar el mensaje');
    console.error(error);
    grecaptcha.reset();
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Enviar';
  }
});
