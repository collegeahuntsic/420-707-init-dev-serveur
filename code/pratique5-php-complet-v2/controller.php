<?php
require_once 'model.php';
require_once 'utils.php';

// Filter input with appropriate filters
$input = sanitizeInput();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $input) {
    if (!empty($input['search_id'])) {
        $searchedUser = getUser($input['search_id']);
    } elseif (!empty($input['delete_id'])) {
        deleteUser($input['delete_id']);
    } elseif (!empty($input['update_id'])) {
        updateUser($input['update_id'], $input['update_name'], $input['update_email'], $input['update_age'], $input['update_phone']);
    } elseif (!empty($input['new_name'])) {
        createUser($input['new_name'], $input['new_email'], $input['new_age'], $input['new_phone']);
    }
}
