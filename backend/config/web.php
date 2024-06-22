<?php

use app\core\interfaces\{IAuthService,IUserService};
use app\core\services\{UserService,AuthService};

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

return [
    'id' => 'rest.api',
    'name' => 'Park Hub',
    'language' => 'pt-br',
    'timeZone' => 'America/Sao_Paulo',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'app\controllers',
    'aliases' => [],
    'bootstrap' => [
        'log',
        'v1',
    ],
    'modules' => [
        'v1' => [
            'class' => 'app\modules\v1\Module',
        ],
    ],
    'container' => [
        'definitions' => [
            IUserService::class => UserService::class,
            IAuthService::class => AuthService::class,
        ],
    ],
    'components' => [
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'transport' => [
                'dsn' => 'smtp://mailhog:1025', // DSN string for MailHog
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'enableCookieValidation' => false,
            'enableCsrfCookie' => false,
            'enableCsrfValidation' => false,
        ],
        'response' => [
            'format' => yii\web\Response::FORMAT_JSON,
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
        ],
        'user' => [
            'identityClass' => 'app\core\models\User',
            'enableAutoLogin' => false,
            'enableSession' => false,
        ],
    ],
    'params' => $params,
];
