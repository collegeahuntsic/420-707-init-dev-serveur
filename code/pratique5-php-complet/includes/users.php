<?php
// Base de données fictive
$users = array(
    array("id" => "1", "name" => "Alice", "email" => "alice@email.com", "age" => 30, "phone" => "555-1234", "created_at" => "2024-05-01"),
    array("id" => "2", "name" => "Bob", "email" => "bob@email.com", "age" => 25, "phone" => "555-5678", "created_at" => "2024-06-15")
);

function getUsers()
{
    global $users;
    return $users;
}

function getUser($id)
{
    global $users;
    $index = findUserIndex($id);
    return $index === -1 ? null : $users[$index];
}

function createUser($newName, $newEmail, $newAge = null, $newPhone = null)
{
    global $users;
    $users[] = array(
        "id" => count($users) + 1,
        "name" => $newName,
        "email" => $newEmail,
        "age" => $newAge,
        "phone" => $newPhone,
        "created_at" => date("Y-m-d H:i:s")
    );
}

function updateUser($id, $name, $email, $age = null, $phone = null)
{
    global $users;
    $index = findUserIndex($id);

    if ($index === -1) return false;

    if ($name) {
        $users[$index]['name'] = $name;
    }
    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $users[$index]['email'] = $email;
    }
    if ($age && is_numeric($age) && $age > 0) {
        $users[$index]['age'] = $age;
    }
    if ($phone && preg_match('/^\d{3}-\d{4}$/', $phone)) {
        $users[$index]['phone'] = $phone;
    }

    $users[$index]['updated_at'] = date("Y-m-d H:i:s");

    return true;
}

function deleteUser($id)
{
    global $users;
    $index = findUserIndex($id);
    if ($index === -1) return false;
    array_splice($users, $index, 1);
    return true;
}

function findUserIndex($id)
{
    global $users;
    foreach ($users as $i => $user) {
        if ($user['id'] == $id) return $i;
    }
    return -1;
}
