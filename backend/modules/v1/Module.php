<?php

namespace app\modules\v1;

use app\filters\auth\HttpBearerAuth;
use yii\base\BootstrapInterface;
use yii\filters\AccessControl;
use yii\filters\Cors;

class Module extends \yii\base\Module implements BootstrapInterface
{
    public function bootstrap($app)
    {
        $app->getUrlManager()->addRules([
            'GET ping' => 'site/ping',
            'POST <module>/<alias:signup|complete-signup>' => '<module>/user/<alias>',
            'POST <module>/<alias:request-password-reset|password-reset>' => '<module>/user/<alias>',
            'POST <module>/<alias:login|refresh-token>' => '<module>/user/<alias>',
            'GET <module>/user/validate-token' => '<module>/user/validate-token',
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
                    'X-Pagination-Total-Count'
                ],
            ]
        ];

        $behaviors['access'] = [
            'class' => AccessControl::class,
            'only' => ['view', 'login', 'refresh-token'],
            'rules' => [
                [
                    'actions' => ['login', 'request-password-reset', 'password-reset'],
                    'allow' => true,
                    'roles' => ['?'], // Guest users
                ],
                [
                    'actions' => [],
                    'allow' => true,
                    'roles' => ['@'], // Authenticated users
                ],
                [
                    'actions' => ['signup'],
                    'allow' => true,
                    'roles' => ['admin'], // Specific roles
                ],
            ],
        ];

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => [
                'user/login',
                'user/complete-signup',
                'user/password-reset',
                'user/request-password-reset'
            ]
        ];

        return $behaviors;
    }
}
