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
            'GET <module>/user/view/<id:\d+>' => '<module>/user/view',
            'GET <module>/user/confirm' => '<module>/user/confirm',
            'POST <module>/<alias:login|join|refresh-token>' => '<module>/user/<alias>',
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

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => [
                'user/login',
                'user/join',
                'user/confirm',
            ]
        ];

        return $behaviors;
    }
}
