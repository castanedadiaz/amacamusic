emailjs.init("muvP16-LeD4NwM6la");  // Asegúrate de que esta sea la clave pública correcta

document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
  
    const formData = new FormData(this); // Obtiene los datos del formulario
    const data = {
      name: formData.get('name'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      message: formData.get('message')
    };
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Enviar los datos como JSON
      });
  
      const result = await response.json();
      alert(result.message); // Mensaje de éxito
    } catch (error) {
      console.error('Error enviando el correo:', error);
      alert('Hubo un error al enviar el correo. Intenta nuevamente.');
    }
  });
  