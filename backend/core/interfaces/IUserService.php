<?php

namespace app\core\interfaces;

use app\core\models\User;
use app\core\models\auth\SignupForm;

interface IUserService
{
    function createUser(SignupForm $request): User;

    function getToken(int $id, string $username): string;

    static function getUserByUsernameOrEmail(string $value);

    function confirmUser(int $id, string $auth_key): bool;
}