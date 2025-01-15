<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "contactos";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]));
} else {
    error_log("Conexión a la base de datos establecida.");
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name']) && isset($data['email']) && isset($data['message'])) {
    error_log("Datos recibidos: " . print_r($data, true));
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $message = $conn->real_escape_string($data['message']);

    $sql = "INSERT INTO contactos (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Formulario enviado y datos almacenados en la base de datos"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}
?>
