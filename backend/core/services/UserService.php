<?php

namespace app\core\services;

use app\core\components\SendMailHelper;
use app\core\interfaces\IUserService;
use app\core\models\auth\CompleteSignupForm;
use app\core\models\auth\SignupForm;
use app\core\models\PasswordResetForm;
use app\core\models\User;
use app\core\types\UserStatus;
use DateTime;
use DateTimeZone;
use Yii;

class UserService implements IUserService
{
    public function preRegisterUser(SignupForm $form): ?User
    {
        $user = new User();
        $user->email = $form->email;
        $user->generateAuthKey();
        $user->setPassword($user->getAuthKey());
        if ($user->saveModel($user)) {
            SendMailHelper::sendInviteEmail($user->getPrimaryKey(), $user->getAuthKey(), $user->email);
    
            $role = Yii::$app->authManager->getRole($form->role);
            Yii::$app->authManager->assign($role, $user->getPrimaryKey());
            
            return $user;
        }

        return null;
    }

    public function completeUserSignup(CompleteSignupForm $form): ?User
    {
        $user = User::findOne($form->id);
        if (!isset($user)) null;

        if (!$user->validateAuthKey($form->token)) return null;

        $user->name = $form->name;
        $user->username = $form->username;
        $user->setPassword($form->password);
        $user->status = UserStatus::ACTIVE;
        $user->generateAuthKey();

        if ($user->saveModel($user)) {
            return $user;
        }

        return null;
    }

    public static function getUserByUsernameOrEmail(string $value)
    {
        $condition = strpos($value, '@') ? ['email' => $value] : ['username' => $value];
        return User::find()->where(['status' => UserStatus::ACTIVE])
            ->andWhere($condition)
            ->one();
    }

    public function requestPasswordReset(string $email): bool
    {
        /** @var User */
        $user = $this->getUserByUsernameOrEmail($email);

        if (isset($user)) {
            $user->generatePasswordResetToken();
            if ($user->saveModel($user)) {
                return SendMailHelper::sendRequestPasswordResetEmail($user->getPrimaryKey(), $user->password_reset_token, $user->email);
            }
        }

        return false;
    }

    public function resetPassword(PasswordResetForm $form): bool
    {
        /** @var User */
        $user = User::findIdentity($form->id);
        
        if (isset($user) && $user->password_reset_token === $form->token) {
            preg_match('/\_(.*)$/', $user->password_reset_token, $matches);
            if (!isset($matches[1])) {
                return false;
            }
    
            $tokenDateTime = new DateTime('@' . $matches[1]);
            $tokenDateTime->setTimezone(new DateTimeZone(Yii::$app->formatter->timeZone));

            // Checks if now is within the token expiration
            if (new DateTime() <= $tokenDateTime) {
                $user->password_reset_token = null;
                $user->setPassword($form->password);
                $user->generateAuthKey();
                
                return $user->saveModel($user);
            }
        }

        return false;
    }
}
