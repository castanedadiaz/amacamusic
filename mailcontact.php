<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $name = htmlspecialchars($_POST['name']);
    $whatsapp = htmlspecialchars($_POST['whatsapp']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Configurar el correo electrónico
    $to = "tu_correo@example.com"; // Reemplaza con tu dirección de correo
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: $name\nWhatsApp: $whatsapp\nEmail: $email\nMensaje:\n$message";
    $headers = "From: $email";

    // Enviar el correo electrónico
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>