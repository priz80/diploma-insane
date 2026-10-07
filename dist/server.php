<?php
header("Content-Type: application/json");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($data && is_array($data)) {
    // Логика отправки на email / в базу данных
    // Например: mail('email@example.com', 'Заявка', print_r($data, true));

    echo json_encode([
        "success" => true,
        "message" => "Заявка отправлена"
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Неверные данные"
    ]);
}
?>
