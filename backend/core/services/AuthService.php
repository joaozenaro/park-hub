<?php

namespace app\core\services;

use app\core\interfaces\IAuthService;
use Firebase\JWT\JWT;
use Yii;
use yii\web\Request;

class AuthService implements IAuthService
{
    public function getToken(int $id, string $username): string
    {
        $request = Yii::$app->request;
        $hostInfo = ($request instanceof Request) ? ($request->hostInfo) : ("");

        $token = array_merge([
            'iat' => time(), // Issued at: timestamp
            'iss' => $hostInfo, // Issuer: issuer application
            'aud' => $hostInfo, // Audience: receiver application
            'nbf' => time(), // Not Before: timestamp of when the token starts being considered valid
            'exp' => time() + 3600, // Expire: timestamp of token lifespan
            'data' => [
                'username' => $username,
            ],
        ], []);

        $token['jti'] = $id; // Encode User ID into JWT

        return JWT::encode($token, Yii::$app->params['jwt.secret'], Yii::$app->params['jwt.algo']);
    }
}