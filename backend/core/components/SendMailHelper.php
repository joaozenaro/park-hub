<?php

namespace app\core\components;

class SendMailHelper
{
    public static function sendRequestPasswordResetEmail(int $id, string $token, string $email)
    {
        $linkUrl = 'http://localhost/password-reset?id=' . $id . '&token=' . $token;

        return \Yii::$app->mailer
            ->compose(
                ['html' => 'request-password-reset-html'],
                [
                    'appName' => \Yii::$app->name,
                    'linkUrl' => $linkUrl,
                ]
            )
            ->setTo($email)
            ->setFrom(['support@parkhub.com' => \Yii::$app->name])
            ->setSubject('Redefinição de senha')
            ->send();
    }

    public static function sendInviteEmail(int $id, string $token, string $email)
    {
        $linkUrl = 'http://localhost/invite?id=' . $id . '&token=' . $token;

        return \Yii::$app->mailer
            ->compose(
                ['html' => 'signup-invite-html'],
                [
                    'appName' => \Yii::$app->name,
                    'linkUrl' => $linkUrl,
                ]
            )
            ->setTo($email)
            ->setFrom(['support@parkhub.com' => \Yii::$app->name])
            ->setSubject('Completar cadastro')
            ->send();
    }
}
