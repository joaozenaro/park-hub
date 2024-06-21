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
            'GET <module>/user/confirm' => '<module>/user/confirm',
            'GET <module>/user/admin-action' => '<module>/user/admin-action',
            'GET <module>/user/validate-token' => '<module>/user/validate-token',
            'GET <module>/request-password-reset' => '<module>/user/request-password-reset',
            'POST <module>/password-reset' => '<module>/user/password-reset',
            // 'GET <module>/user/<alias:confirm|admin-action|validate-token>' => '<module>/user/<alias>',
            'POST <module>/<alias:login|signup|refresh-token>' => '<module>/user/<alias>',
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

        $behaviors['access'] = [
            'class' => AccessControl::class,
            'only' => ['view', 'signup', 'login', 'refresh-token', 'confirm'],
            'rules' => [
                [
                    'actions' => ['signup', 'login', 'confirm', 'password-reset'],
                    'allow' => true,
                    'roles' => ['?'], // Guest users
                ],
                [
                    'actions' => ['refresh-token'],
                    'allow' => true,
                    'roles' => ['@'], // Authenticated users
                ],
                [
                    'actions' => ['admin-action'],
                    'allow' => true,
                    'roles' => ['admin'], // Specific roles
                ],
            ],
        ];

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => [
                'user/login',
                'user/signup',
                'user/confirm',
                'user/password-reset'
            ]
        ];

        return $behaviors;
    }
}
