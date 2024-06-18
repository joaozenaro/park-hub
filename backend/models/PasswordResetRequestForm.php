<?php

namespace app\models;

use Yii;
use yii\base\Model;

class PasswordResetRequestForm extends Model
{
    public $email;

    public function rules()
    {
        return [
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            [
                'email',
                'exist',
                'targetClass' => '\app\models\User',
                'filter' => ['status' => User::STATUS_ACTIVE],
                'message' => Yii::t('app', 'There is no user with this email address.')
            ],
        ];
    }

    public function sendPasswordResetEmail()
    {
        $user = User::findOne([
            'status' => User::STATUS_ACTIVE,
            'email' => $this->email,
        ]);

        if (!$user) {
            return false;
        }

        if (!User::isPasswordResetTokenValid($user->password_reset_token)) {
            $user->generatePasswordResetToken();
            if (!$user->save(false)) {
                return false;
            }
        }

        $resetURL = \Yii::$app->params['frontendURL'] . '#/password-reset?token=' . $user->password_reset_token;

        return Yii::$app
            ->mailer
            ->compose(
                ['html' => 'password-reset-token-html'],
                [
                    'user' => $user,
                    'appName' => \Yii::$app->name,
                    'resetURL' => $resetURL,
                ]
            )
            ->setFrom([Yii::$app->params['supportEmail'] => \Yii::$app->name])
            ->setTo($this->email)
            ->setSubject('Password reset for ' . Yii::$app->name)
            ->send();
    }
}
