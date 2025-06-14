<?php

function createForm(array $user): string
{
    return '
        <form method="POST" class="user-form">
            <div class="form-group">
                ' . createInput('hidden', 'update_id', $user['id']) . '
                
                <label for="update_name">Nom:</label>
                ' . createInput('text', 'update_name', $user['name']) . '
            </div>

            <div class="form-group">
                <label for="update_email">Email:</label>
                ' . createInput('email', 'update_email', $user['email']) . '
            </div>

            <div class="form-group">
                <label for="update_age">Âge:</label>
                ' . createInput('number', 'update_age', $user['age']) . '
            </div>

            <div class="form-group">
                <label for="update_phone">Téléphone:</label>
                ' . createInput('tel', 'update_phone', $user['phone']) . '
            </div>

            <div class="form-actions">
                <button type="submit">Mettre à jour</button>
                <button type="submit" name="cancel" value="1" class="cancel-btn">Annuler</button>
            </div>
        </form>
    ';
}

function printUser(array $user): void
{
    echo "Nom: " . htmlspecialchars($user['name']) . "<br>";
    echo "Email: " . htmlspecialchars($user['email']) . "<br>";
    echo "Âge: " . htmlspecialchars($user['age']) . "<br>";
    echo "Téléphone: " . htmlspecialchars($user['phone']) . "<br>";
    echo "Inscription: " . htmlspecialchars($user['created_at']) . "<br>";
}

// Fetch users
$usersList = getUsers();

echo "<div class='card-list'>";

// Show searched user if available
if (isset($searchedUser)) {
    echo "<div class='card'>";
    if ($searchedUser === null) {
        echo "<p class='error'>Utilisateur introuvable.</p>";
    } else {
        printUser($searchedUser);
    }
    echo "</div>";
} else {
    foreach ($usersList as $user) {
        echo "<div class='card'>";
        if (isset($input['update']) && $user['id'] == $input['update']) {
            echo createForm($user);
        } else {
            printUser($user);

            // Delete button
            echo <<<HTML
                <form method="POST" style="display:inline">
                    <input type="hidden" name="delete_id" value="{$user['id']}">
                    <input type="submit" value="Supprimer" onclick="return confirm('Supprimer cet utilisateur ?');">
                </form>
            HTML;

            // Update button
            echo <<<HTML
                <form method="POST" style="display:inline">
                    <input type="hidden" name="update" value="{$user['id']}">
                    <input type="submit" value="Modifier">
                </form>
            HTML;
        }
        echo "</div>";
    }
}

echo "</div>";
?>
