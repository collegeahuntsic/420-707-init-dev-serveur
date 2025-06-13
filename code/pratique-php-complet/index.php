<?php

require_once 'includes/header.php';

require_once 'includes/users.php';

function line($k, $v)
{
    return $k . ": " . $v . "<br>";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['search_id'])) {
        $searchedUser = getUser($_POST['search_id']);
    }

    if (isset($_POST['delete_id'])) {
        deleteUser($_POST['delete_id']);
    }

    if (isset($_POST['update_id'])) {
        updateUser($_POST['update_id'], $_POST['update_name'], $_POST['update_email'], $_POST['update_age'], $_POST['update_phone']);
    }

    if (isset($_POST['new_name'])) {
        createUser($_POST['new_name'], $_POST['new_email'], $_POST['new_age'], $_POST['new_phone']);
    }
}
?>

<h1>Utilisateurs</h1>

<?php require_once 'includes/userList.php'; ?>
<?php require_once 'includes/create_form.php'; ?>

<?php
if (isset($_POST['update'])) {
   require_once 'includes/update_form.php';
}
?>

<?php require_once 'includes/search_form.php'; ?>

<?php
if (isset($searchedUser)) {
    if ($searchedUser === null) {
        echo "<p style='color:red;'>Utilisateur introuvable.</p>";
    } else {
        echo "<h3>Détails utilisateur</h3><p>";
        printUser($searchedUser);
        echo "</p>";
    }
}

require_once 'includes/footer.php';
?>
