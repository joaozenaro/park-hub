<?php

namespace app\core\interfaces;

use app\core\models\User;
use app\core\models\auth\SignupForm;
use app\core\models\PasswordResetForm;

interface IUserService
{
    function createUser(SignupForm $form): User;

    function getToken(int $id, string $username): string;

    static function getUserByUsernameOrEmail(string $value);

    function confirmUser(int $id, string $auth_key): bool;

    function requestPasswordReset(string $token): bool;
    
    function resetPassword(PasswordResetForm $form): bool;
}