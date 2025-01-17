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

// Enviar el formulario usando EmailJS
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    emailjs.sendForm('service_dsna02d', 'template_iew81gs', this)
        .then(function() {
            document.getElementById('contactPopup').style.display = 'none';
            document.getElementById('successPopup').style.display = 'block';
        }, function(error) {
            alert('Error al enviar el mensaje: ' + JSON.stringify(error));
        });
});