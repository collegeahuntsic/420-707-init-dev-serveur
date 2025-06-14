<?php require_once './controller.php' ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Initiation au développement côté serveur (PHP): Pratique 1</title>
    <link rel="stylesheet" href="./assets/base.css">
    <link rel="stylesheet" href="./assets/styles.css">
</head>
<body>

<?php require_once 'includes/layout/header.php'; ?>

<main class="content-wrapper">
    <section>
        <h2>Rechercher un utilisateur</h2>
        <?php require_once 'includes/forms/search_form.php'; ?>
        <?php require_once 'includes/userList.php'; ?>
    </section>
    
    <section style="margin-top: 24px;">
        <h2>Créer un utilisateur</h2>
        <?php require_once 'includes/forms/create_form.php'; ?>
    </section>
</main>

<?php require_once 'includes/layout/footer.php'; ?>

</body>
</html>