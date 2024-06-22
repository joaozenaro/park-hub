<?php

namespace app\core\interfaces;

use app\core\models\auth\CompleteSignupForm;
use app\core\models\auth\SignupForm;
use app\core\models\User;
use app\core\models\PasswordResetForm;

interface IUserService
{
    function preRegisterUser(SignupForm $form): ?User;
    
    function completeUserSignup(CompleteSignupForm $form): ?User;

    static function getUserByUsernameOrEmail(string $value);

    function requestPasswordReset(string $email): bool;
    
    function resetPassword(PasswordResetForm $form): bool;
}