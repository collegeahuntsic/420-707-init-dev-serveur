<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Initiation au développement côté serveur (PHP): Pratique 1</title>
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
<?php
session_start();

// Base de données fictive
$users = array(
    array("id" => "1", "name" => "Alice", "email" => "alice@email.com", "age" => 30, "phone" => "555-1234", "created_at" => "2024-05-01"),
    array("id" => "2", "name" => "Bob", "email" => "bob@email.com", "age" => 25, "phone" => "555-5678", "created_at" => "2024-06-15")
);

function getUsers() {
    global $users;
    return $users;
}

function getUser($id) {
    global $users;
    $index = findUserIndex($id);
    return $index === -1 ? null : $users[$index];
}

function updateUser($id, $name, $email, $age, $phone) {
    global $users;
    $index = findUserIndex($id);
    if ($index === -1) return false;

    $users[$index]['name'] = $name;
    $users[$index]['email'] = $email;
    $users[$index]['age'] = $age;
    $users[$index]['phone'] = $phone;
    return true;
}

function deleteUser($id) {
    global $users;
    $index = findUserIndex($id);
    if ($index === -1) return false;
    array_splice($users, $index, 1);
    return true;
}

function findUserIndex($id) {
    global $users;
    foreach ($users as $i => $user) {
        if ($user['id'] == $id) return $i;
    }
    return -1;
}

function line($k, $v) {
    return $k . ": " . $v . "<br>";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['search_id'])) {
        $searchedUser = getUser($_POST['search_id']);
    }
}
?>

<h1>Utilisateurs</h1>

<?php
$usersList = getUsers();
foreach ($usersList as $user) {
    echo "<div>";
    echo "ID: " . $user['id'] . "<br>";
    echo "Nom: " . htmlspecialchars($user['name']) . "<br>";
    echo "Email: " . htmlspecialchars($user['email']) . "<br>";
    echo "Âge: " . $user['age'] . "<br>";
    echo "Téléphone: " . htmlspecialchars($user['phone']) . "<br>";
    echo "Inscription: " . $user['created_at'] . "<br>";

    echo "
    <form method='POST' style='display:inline'>
        <input type='hidden' name='delete_id' value='" . $user['id'] . "'>
        <input type='submit' value='Supprimer' onclick=\"return confirm('Supprimer cet utilisateur ?');\">
    </form>
    <form method='GET' style='display:inline'>
        <input type='hidden' name='update' value='" . $user['id'] . "'>
        <input type='submit' value='Modifier'>
    </form>
    ";
    echo "</div><hr>";
}
?>

<h2>Rechercher un utilisateur</h2>
<form method='POST'>
    <label>ID utilisateur:
        <input type='text' name='search_id'>
    </label>
    <input type='submit' value='Rechercher'>
</form>

<?php
if (isset($searchedUser)) {
    if ($searchedUser === null) {
        echo "<p style='color:red;'>Utilisateur introuvable.</p>";
    } else {
        echo "<h3>Détails utilisateur</h3><p>" .
            line("ID", $searchedUser['id']) .
            line("Nom", htmlspecialchars($searchedUser['name'])) .
            line("Email", htmlspecialchars($searchedUser['email'])) .
            line("Téléphone", htmlspecialchars($searchedUser['phone'])) .
            line("Inscription", $searchedUser['created_at']) .
            "</p>";
    }
}
?>
</body>

</html>
