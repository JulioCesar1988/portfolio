<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $date = date('Y-m-d H:i:s');

    // Crear el contenido del mensaje
    $messageContent = "Fecha: $date\n";
    $messageContent .= "Nombre: $name\n";
    $messageContent .= "Email: $email\n";
    $messageContent .= "Mensaje: $message\n";
    $messageContent .= "----------------------------------------\n";

    // Guardar el mensaje en el archivo
    $file = '../messages.txt';
    file_put_contents($file, $messageContent, FILE_APPEND);

    // Redirigir de vuelta a la página principal
    header('Location: ../index.html#about');
    exit();
}
?> 