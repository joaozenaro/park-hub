<?php

namespace app\modules\v1;

use app\filters\auth\HttpBearerAuth;
use yii\base\BootstrapInterface;
use yii\filters\Cors;

class Module extends \yii\base\Module implements BootstrapInterface
{
    public function bootstrap($app)
    {
        $app->getUrlManager()->addRules([
            'GET ping' => 'site/ping',
            'POST v1/user/login' => 'v1/user/login',
            'OPTIONS v1/user/login' => 'v1/user/options',
            'POST v1/user/signup' => 'v1/user/signup',
            'OPTIONS v1/user/signup' => 'v1/user/options',
            'GET v1/user/confirm' => 'v1/user/confirm',
            'OPTIONS v1/user/confirm' => 'v1/user/options',
            'POST v1/user/password-reset-request' => 'v1/user/password-reset-request',
            'OPTIONS v1/user/password-reset-request' => 'v1/user/options',
            'POST v1/user/password-reset-token-verification' => 'v1/user/password-reset-token-verification',
            'OPTIONS v1/user/password-reset-token-verification' => 'v1/user/options',
            'POST v1/user/password-reset' => 'v1/user/password-reset',
            'OPTIONS v1/user/password-reset' => 'v1/user/options',
            'GET v1/user/me' => 'v1/user/me',
            'POST v1/user/me' => 'v1/user/me-update',
            'OPTIONS v1/user/me' => 'v1/user/options',
            'GET v1/user/validate-token' => 'v1/user/validate-token',
            'GET v1/user/<id:\d+>' => 'v1/user/view',
            'POST v1/user/create' => 'v1/user/create',
        ], false);
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // remove rateLimiter which requires an authenticated user to work
        unset($behaviors['rateLimiter']);

        // remove authentication filter
        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
                #'Access-Control-Allow-Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                #'Access-Control-Allow-Credentials' => null,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => [
                    'X-Pagination-Current-Page',
                    'X-Pagination-Page-Count',
                    'X-Pagination-Per-Page',
                    'X-Pagination-Total-Count'
                ],
            ]
        ];

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => [
                'user/view',
                'user/login',
                'user/signup',
                'user/validate-token',
                'user/confirm',
                'user/create'
            ]
        ];

        return $behaviors;
    }
}
