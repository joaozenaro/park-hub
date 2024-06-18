<?php

namespace app\models;

use app\models\user\UserIdentity;
use Yii;
use yii\db\Expression;
use Firebase\JWT\JWT;

class User extends UserIdentity
{
    public string $access_token;
    public array $permissions;

    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    public function confirmEmail(): bool
    {
        if ($this->unconfirmed_email != '') {
            $this->email = $this->unconfirmed_email;
        }
        $this->registration_ip = Yii::$app->request->userIP;
        $this->status = self::STATUS_ACTIVE;
        $this->save(false);
        $this->touch('confirmed_at');

        return true;
    }

    public function generateAccessTokenAfterUpdatingClientInfo($forceRegenerate = false): bool
    {
        $this->last_login_ip = Yii::$app->request->getUserIP();
        $this->last_login_at = new Expression('UNIX_TIMESTAMP()');

        // Check if time is expired
        if (
            $forceRegenerate == true
            || $this->access_token_expired_at == null
            || (time() > $this->access_token_expired_at)
        ) {
            // generate access token
            $this->generateAccessToken();
        }
        $this->save(false);
        return true;
    }

    public function generateAccessToken()
    {
        $tokens = $this->getJWT();
        $this->access_token = $tokens[0];
        $this->access_token_expired_at = $tokens[1]['exp']; // Expire
    }

    public function getJWT(): array
    {
        $request = Yii::$app->request;
        $hostInfo = ($request instanceof yii\web\Request) ? ($request->hostInfo) : ("");

        $token = array_merge([
            'iat' => time(), // Issued at: timestamp
            'iss' => $hostInfo, // Issuer: issuer application
            'aud' => $hostInfo, // Audience: receiver application
            'nbf' => time(), // Not Before: timestamp of when the token starts being considered valid
            'exp' => time() + 60, // Expire: timestamp of token lifespan
            'data' => [
                'username' => $this->username,
                'roleLabel' => $this->getRoleLabel(),
                'lastLoginAt' => $this->last_login_at,
            ]
        ], []);

        $token['jti'] = $this->getId(); // Encode User ID into JWT

        return [JWT::encode($token, static::getSecretKey(), static::getAlgo()), $token];
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    public function getRoleLabel()
    {
        $roleLabel = '';
        switch ($this->role) {
            case self::ROLE_USER:
                $roleLabel = Yii::t('app', 'User');
                break;
            case self::ROLE_STAFF:
                $roleLabel = Yii::t('app', 'Staff');
                break;
            case self::ROLE_ADMIN:
                $roleLabel = Yii::t('app', 'Administrator');
                break;
        }
        return $roleLabel;
    }
}
