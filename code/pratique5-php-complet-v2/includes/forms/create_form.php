<form method="POST">
    <div class="form-group">
        <label for="new_name">Nom:</label>
        <?= createInput('text', 'new_name') ?>
    </div>

    <div class="form-group">
        <label for="new_email">Email:</label>
        <?= createInput('email', 'new_email') ?>
    </div>

    <div class="form-group">
        <label for="new_age">Age:</label>
        <?= createInput('number', 'new_age') ?>
    </div>

    <div class="form-group">
        <label for="new_phone">Téléphone:</label>
        <?= createInput('tel', 'new_phone') ?>
    </div>

    <button type="submit">Envoyer</button>
</form>
