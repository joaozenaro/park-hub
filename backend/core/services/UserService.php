<?php

namespace app\core\services;

use app\core\interfaces\IUserService;
use app\core\models\auth\SignupForm;
use app\core\models\PasswordResetForm;
use app\core\models\User;
use app\core\types\UserStatus;
use DateTime;
use DateTimeZone;
use Exception;
use Firebase\JWT\JWT;
use Yii;
use yii\web\Request;

class UserService implements IUserService
{
    public function createUser(SignupForm $form): User
    {
        $user = new User();
        try {
            $user->username = $form->username;
            $user->email = $form->email;
            $user->setPassword($form->password);
            $user->generateAuthKey();
            if (!$user->save()) {
                throw new \yii\db\Exception($user->firstErrors);
            }

            $this->sendConfirmationEmail($user->getPrimaryKey(), $user->getAuthKey(), $user->email);

        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $user;
    }

    public function getToken(int $id, string $username): string
    {
        $request = Yii::$app->request;
        $hostInfo = ($request instanceof Request) ? ($request->hostInfo) : ("");

        $token = array_merge([
            'iat' => time(), // Issued at: timestamp
            'iss' => $hostInfo, // Issuer: issuer application
            'aud' => $hostInfo, // Audience: receiver application
            'nbf' => time(), // Not Before: timestamp of when the token starts being considered valid
            'exp' => time() + 3600, // Expire: timestamp of token lifespan
            'data' => [
                'username' => $username,
            ],
        ], []);

        $token['jti'] = $id; // Encode User ID into JWT

        return JWT::encode($token, Yii::$app->params['jwt.secret'], Yii::$app->params['jwt.algo']);
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
            if (!$user->save()) {
                throw new \yii\db\Exception($user->firstErrors);
            }

            return $this->sendRequestPasswordResetEmail($user->getPrimaryKey(), $user->password_reset_token, $user->email);
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

                if (!$user->save()) {
                    throw new \yii\db\Exception($user->firstErrors);
                }

                return true;
            }
        }

        return false;
    }

    public function confirmUser(int $id, string $auth_key): bool
    {
        try {
            $user = User::findOne($id);
            if (!$user->validateAuthKey($auth_key)) {
                return false;
            }

            // Generate new auth_key
            $user->generateAuthKey();

            // Update status
            $user->status = UserStatus::ACTIVE;
            if (!$user->save()) {
                throw new \yii\db\Exception($user->firstErrors);
            }

            // Enviar email sucesso?
            return true;

        } catch (Exception) {
            return false;
        }

        return false;
    }

    private function sendRequestPasswordResetEmail(int $id, string $token, string $email)
    {
        $confirmURL = 'http://localhost/password-reset?id=' . $id . '&token=' . $token;
        
        $email = \Yii::$app->mailer
            ->compose(
                ['html' => 'request-password-reset-html'],
                [
                    'appName' => \Yii::$app->name,
                    'confirmURL' => $confirmURL,
                ]
                )
                ->setTo($email)
                ->setFrom(['support@parkhub.com' => \Yii::$app->name])
                ->setSubject('Redefinição de senha')
                ->send();
    
        return $email;
    }
            
    private function sendConfirmationEmail(int $id, string $auth_key, string $email)
    {
        $confirmURL = 'http://localhost/api/v1/user/confirm?id=' . $id . '&auth_key=' . $auth_key;
                
        $email = \Yii::$app->mailer
            ->compose(
                ['html' => 'signup-confirmation-html'],
                [
                    'appName' => \Yii::$app->name,
                    'confirmURL' => $confirmURL,
                ]
            )
            ->setTo($email)
            ->setFrom(['support@parkhub.com' => \Yii::$app->name])
            ->setSubject('Confirmação de cadastro')
            ->send();

        return $email;
    }
}
