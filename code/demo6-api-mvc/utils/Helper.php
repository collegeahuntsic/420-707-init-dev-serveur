<?php

function isNullOrUndefined(&$value): bool {
    return !isset($value) || is_null($value);
}

function isWhiteSpace(string $value): bool {
    return trim($value) === '';
}

function isNullOrWhitespace($value): bool {
    return is_null($value) || (is_string($value) && isWhiteSpace($value));
}