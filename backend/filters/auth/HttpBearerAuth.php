<?php

namespace app\filters\auth;

use app\core\components\ResponseHelper;
use Throwable;

class HttpBearerAuth extends \yii\filters\auth\AuthMethod
{
    public $realm = 'api';

    public function authenticate($user, $request, $response)
    {
        $authHeader = $request->getHeaders()->get('Authorization');

        if ($authHeader == null && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) && $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] != '') {
            $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }

        if (!isset($authHeader)) return ResponseHelper::Unauthorized();

        preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches);

        try {
            $identity = $user->loginByAccessToken($matches[1], get_class($this));

            if ($identity === null) {
                return ResponseHelper::Unauthorized();
            }

            return $identity;

        } catch (Throwable $e) {
            return ResponseHelper::Unauthorized();
        }
    }
}
