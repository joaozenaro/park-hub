<?php

namespace app\core\services;

use app\core\interfaces\IUserService;
use app\core\models\auth\SignupForm;
use app\core\models\User;
use app\core\types\UserStatus;
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
            ->setSubject('Signup confirmation')
            ->send();

        return $email;
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
}
