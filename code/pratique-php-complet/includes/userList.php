<?php
function printUser($user)
{
    echo "ID: " . $user['id'] . "<br>";
    echo "Nom: " . htmlspecialchars($user['name']) . "<br>";
    echo "Email: " . htmlspecialchars($user['email']) . "<br>";
    echo "Âge: " . $user['age'] . "<br>";
    echo "Téléphone: " . htmlspecialchars($user['phone']) . "<br>";
    echo "Inscription: " . $user['created_at'] . "<br>";
}

$usersList = getUsers();
foreach ($usersList as $user) {
    echo "<div>";
    printUser($user);
    echo "
    <form method='POST' style='display:inline'>
        <input type='hidden' name='delete_id' value='" . $user['id'] . "'>
        <input type='submit' value='Supprimer' onclick=\"return confirm('Supprimer cet utilisateur ?');\">
    </form>
    <form method='POST' style='display:inline'>
        <input type='hidden' name='update' value='" . $user['id'] . "'>
        <input type='submit' value='Modifier'>
    </form>
    ";
    echo "</div><hr>";
}
