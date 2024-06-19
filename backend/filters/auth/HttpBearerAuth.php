<?php

namespace app\filters\auth;

use Exception;

class HttpBearerAuth extends \yii\filters\auth\AuthMethod
{
    public $realm = 'api';

    public function authenticate($user, $request, $response)
    {
        $authHeader = $request->getHeaders()->get('Authorization');

        if ($authHeader == null && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) && $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] != '') {
            $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }

        if ($authHeader !== null && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
            try {
                $identity = $user->loginByAccessToken($matches[1], get_class($this));

                if ($identity === null) {
                    $this->handleFailure($response);
                }
    
                return $identity;

            } catch (Exception $e) {
                return null;
            }
        }

        return null;
    }
}
