
// Mostrar el pop-up al hacer clic en el botón de contacto
document.getElementById('contactButton').addEventListener('click', function() {
    document.getElementById('contactPopup').style.display = 'block';
});

// Cerrar el pop-up al hacer clic en la "x"
document.querySelectorAll('.popup .close').forEach(function(closeButton) {
    closeButton.addEventListener('click', function() {
        closeButton.closest('.popup').style.display = 'none';
    });
});

// Cerrar el pop-up al hacer clic fuera del contenido del pop-up
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup')) {
        event.target.style.display = 'none';
    }
});


// Enviar el formulario usando Fetch API
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('contactPopup').style.display = 'none';
            document.getElementById('successPopup').style.display = 'block';
        } else {
            response.text().then(text => {
                alert('Error al enviar el mensaje: ' + text);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el mensajee: ' + error.message);
    });
});