<?php

function handleUsers($method, $id = null)
{
    static $users = [
        ["id" => 1, "name" => "Alice"],
        ["id" => 2, "name" => "Bob"]
    ];

    switch ($method) {
        case 'GET':
            if ($id) {
                $user = getUserById((int)$id, $users);
                if ($user) {
                    echo json_encode($user);
                } else {
                    sendError("User not found", 404);
                }
            } else {
                echo json_encode($users);
            }
            break;

        case 'POST':
            $input = getBody();
            if (!$input || !validateName($input['name'] ?? null)) {
                sendError("Name is required and must be a non-empty string", 400);
                return;
            }

            $newUser = [
                "id" => end($users)['id'] + 1,
                "name" => trim($input['name'])
            ];

            $users[] = $newUser;

            http_response_code(201);
            echo json_encode($newUser);

            break;

        case 'PUT':
            if (!$id) {
                sendError("User ID is required for update", 400);
                return;
            }

            $input = getBody();
            if (!$input || !validateName($input['name'] ?? null)) {
                sendError("Name is required and must be a non-empty string", 400);
                return;
            }

            foreach ($users as &$user) {
                if ($user['id'] == $id) {
                    $user['name'] = trim($input['name']);
                    echo json_encode($user);
                    return;
                }
            }

            sendError("User not found", 404);
            break;

        case 'DELETE':
            if (!$id) {
                sendError("User ID is required for deletion", 400);
                return;
            }

            foreach ($users as $index => $user) {
                if ($user['id'] == $id) {
                    array_splice($users, $index, 1);
                    echo json_encode(["message" => "User deleted"]);
                    return;
                }
            }

            sendError("User not found", 404);
            break;

        default:
            sendError("Method not allowed", 405);
    }
}

function getUserById($id, $users)
{
    foreach ($users as $user) {
        if ($user['id'] == $id) {
            return $user;
        }
    }
    return null;
}

function getBody()
{
    $input = json_decode(file_get_contents("php://input"), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return null;
    }
    return $input;
}

function validateName($name)
{
    return is_string($name) && trim($name) !== '';
}

function sendError($message, $code)
{
    http_response_code($code);
    echo json_encode(["error" => $message]);
}
