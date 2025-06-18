<h2>Liste des utilisateurs</h2>
<a href="index.php?action=ajouter_utilisateur">Ajouter</a>
<ul>
<?php foreach ($users as $u): ?>
    <li><?= htmlspecialchars($u['nom']) ?> (<?= htmlspecialchars($u['email']) ?>)</li>
<?php endforeach; ?>
</ul>
