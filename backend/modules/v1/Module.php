<?php

namespace app\modules\v1;

use app\filters\auth\HttpBearerAuth;
use yii\base\BootstrapInterface;
use yii\filters\Cors;

class Module extends \yii\base\Module implements BootstrapInterface
{
    public function bootstrap($app)
    {
        // Auth and user routes
        $app->getUrlManager()->addRules([
            'GET ping' => 'site/ping',
            'GET <module>/validate-token' => '<module>/auth/validate-token',
            'POST <module>/<alias:login|refresh-token|request-password-reset|password-reset>' => '<module>/auth/<alias>',
            'POST <module>/<alias:signup|complete-signup>' => '<module>/user/<alias>',
            
            'GET <module>/user/<id:\d+>' => '<module>/user/view',
            'POST <module>/user/search' => '<module>/user/search',
            'PATCH <module>/user/update/<id:\d+>' => '<module>/user/update',
            'DELETE <module>/user/delete/<id:\d+>' => '<module>/user/delete',

            'POST <module>/spot/reservations' => '<module>/spot/reservations',
        ], false);

        // Shared route actions
        foreach (['spot', 'spot-type', 'reservation'] as $entity) {
            $app->getUrlManager()->addRules([
                "GET <module>/$entity/<id:\d+>" => "<module>/$entity/view",
                "POST <module>/$entity/search" => "<module>/$entity/search",
                "POST <module>/$entity/add" => "<module>/$entity/add",
                "PATCH <module>/$entity/update/<id:\d+>" => "<module>/$entity/update",
                "DELETE <module>/$entity/delete/<id:\d+>" => "<module>/$entity/delete",
            ], false);
        }
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Remove rateLimiter and default authentication filter
        unset($behaviors['rateLimiter'], $behaviors['authenticator']);

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