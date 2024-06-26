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
            
            'GET <module>/user/<id:\d+>' => '<module>/user/view',
            'POST <module>/user/search' => '<module>/user/search',
            'PATCH <module>/user/update/<id:\d+>' => '<module>/user/update',
            'DELETE <module>/user/delete/<id:\d+>' => '<module>/user/delete',
            
            'GET <module>/spot/<id:\d+>' => '<module>/spot/view',
            'POST <module>/spot/search' => '<module>/spot/search',
            'POST <module>/spot/add' => '<module>/spot/add',
            'PATCH <module>/spot/update/<id:\d+>' => '<module>/spot/update',
            'DELETE <module>/spot/delete/<id:\d+>' => '<module>/spot/delete',

            'GET <module>/spot-type/<id:\d+>' => '<module>/spot-type/view',
            'POST <module>/spot-type/search' => '<module>/spot-type/search',
            'POST <module>/spot-type/add' => '<module>/spot-type/add',
            'PATCH <module>/spot-type/update/<id:\d+>' => '<module>/spot-type/update',
            'DELETE <module>/spot-type/delete/<id:\d+>' => '<module>/spot-type/delete',    
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
            ], // Public actions
        ];

        return $behaviors;
    }
}