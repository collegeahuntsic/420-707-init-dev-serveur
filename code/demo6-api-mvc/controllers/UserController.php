<?php

require_once __DIR__ . '/../utils/Helper.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../models/User.php';

class UserController
{
    private User $model;

    public function __construct(mysqli $db)
    {
        $this->model = new User($db);
    }

    public function getUsers(): void
    {
        $users = $this->model->getAll();
        sendResponse($users);
    }

    public function getUser($id): void
    {
        if (isNullOrWhitespace($id)) {
            sendError("ID is required", 400);
            return;
        }

        $user = $this->model->findById((int) $id);

        if (isNullOrUndefined($user)) {
            sendError("User not found", 404);
            return;
        }

        sendResponse($user);
    }

    public function createUser(): void
    {
        $input = getJsonInput();

        if (
            !$input ||
            !isset($input['name'], $input['email'], $input['password']) ||
            isNullOrWhitespace($input['name']) ||
            isNullOrWhitespace($input['email']) ||
            isNullOrWhitespace($input['password'])
        ) {
            sendError("Name, email, and password are required", 400);
            return;
        }

        $created = $this->model->create(
            trim($input['name']),
            trim($input['email']),
            $input['password']
        );

        if ($created) {
            sendResponse(['message' => 'User created'], 201);
        } else {
            sendError('Failed to create user', 500);
        }
    }

    public function update($id): void
    {
        if (isNullOrUndefined($id)) {
            sendError("ID is required for update", 400);
            return;
        }

        $input = getJsonInput();

        if (
            !$input ||
            !isset($input['name'], $input['email'], $input['password']) ||
            isNullOrWhitespace($input['name']) ||
            isNullOrWhitespace($input['email']) ||
            isNullOrWhitespace($input['password'])
        ) {
            sendError("Name, email, and password are required", 400);
            return;
        }

        $updated = $this->model->update(
            (int) $id,
            trim($input['name']),
            trim($input['email']),
            $input['password']
        );

        if ($updated) {
            sendResponse(['message' => 'User updated']);
        } else {
            sendError('User not found or update failed', 404);
        }
    }

    public function delete($id): void
    {
        if (isNullOrUndefined($id)) {
            sendError("ID is required for deletion", 400);
            return;
        }

        $deleted = $this->model->delete((int) $id);

        if ($deleted) {
            sendResponse(['message' => 'User deleted']);
        } else {
            sendError('User not found or delete failed', 404);
        }
    }
}
