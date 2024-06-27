<?php

namespace app\core\interfaces;

use app\core\models\auth\CompleteSignupForm;
use app\core\models\auth\PasswordResetForm;
use app\core\models\auth\SignupForm;
use app\core\models\base\User;

interface IUserService
{
    function preRegisterUser(SignupForm $form): ?User;
    
    function completeUserSignup(CompleteSignupForm $form): ?User;

    static function getUserByUsernameOrEmail(string $value);

    function requestPasswordReset(string $email): bool;
    
    function resetPassword(PasswordResetForm $form): bool;
}