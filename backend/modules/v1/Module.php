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
            'GET <module>/validate-token' => '<module>/auth/validate-token',
            'POST <module>/<alias:login|refresh-token|request-password-reset|password-reset>' => '<module>/auth/<alias>',
            'POST <module>/<alias:signup|complete-signup>' => '<module>/user/<alias>',

            'GET <module>/user/<alias>/<id:\d+>' => '<module>/user/<alias>',
            'POST <module>/user/<alias>' => '<module>/user/<alias>',
        ], false);
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Remove rateLimiter which requires an authenticated user to work
        unset($behaviors['rateLimiter']);

        // Remove authentication filter
        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => [
                    'X-Pagination-Current-Page',
                    'X-Pagination-Page-Count',
                    'X-Pagination-Per-Page',
                    'X-Pagination-Total-Count',
                ],
            ],
        ];

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => [
                'user/complete-signup',
                'auth/login',
                'auth/password-reset',
                'auth/request-password-reset',
            ], // Public Routes
        ];

        return $behaviors;
    }
}
