<?php

function createInput(string $type, string $name, string $value = '', bool $required = true): string {
    $id = $name;
    $val = isset($value) ? htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8') : '';
    $requiredAttr = $required ? 'required' : '';

    return <<<HTML
        <input type="$type" name="$name" id="$id" value="$val" $requiredAttr>
    HTML;
}


function sanitizeInput() {
    return filter_input_array(INPUT_POST, [
    'search_id'     => FILTER_SANITIZE_NUMBER_INT,
    'delete_id'     => FILTER_SANITIZE_NUMBER_INT,
    'update_id'     => FILTER_SANITIZE_NUMBER_INT,
    'update_name'   => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'update_email'  => FILTER_SANITIZE_EMAIL,
    'update_age'    => FILTER_SANITIZE_NUMBER_INT,
    'update_phone'  => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'new_name'      => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'new_email'     => FILTER_SANITIZE_EMAIL,
    'new_age'       => FILTER_SANITIZE_NUMBER_INT,
    'new_phone'     => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'update'        => FILTER_DEFAULT 
]);
}