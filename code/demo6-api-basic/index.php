<?php
header("Content-Type: application/json");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

// Example: /myapi/users/2 → ["myapi", "users", "2"]
$endpoint = $requestUri[1] ?? '';
$resourceId = $requestUri[2] ?? null;

require_once 'users.php';

switch ($endpoint) {
    case 'users':
        handleUsers($requestMethod, $resourceId);
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint not found"]);
}
