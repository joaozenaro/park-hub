<?php

namespace app\models\user;

use Firebase\JWT\JWT;
use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

abstract class UserIdentity extends AbstractUser
{
    // Decoded token storage
    protected static array $decodedToken;

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => 'updated_at',
                'value' => time(),
            ],
        ];
    }

    public static function findIdentity($id)
    {
        $user = static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
        return $user && !$user->getIsBlocked() && $user->getIsConfirmed() ? $user : null;
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        $secret = static::getSecretKey();
        try {
            $decoded = JWT::decode($token, $secret, [static::getAlgo()]);
        } catch (\Exception $e) {
            return null;
        }

        static::$decodedToken = (array) $decoded;
        return static::$decodedToken['jti'] ?? null ? static::findByJTI(static::$decodedToken['jti']) : null;
    }

    public static function findByUsername($username)
    {
        $user = static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
        if (
            $user !== null &&
            ($user->getIsBlocked() == true || $user->getIsConfirmed() == false)
        ) {
            return null;
        }

        return $user;
    }

    public static function findByUsernameWithRoles($username, $roles)
    {
        /** @var User $user */
        $user = static::find()->where([
            'username' => $username,
            'status' => self::STATUS_ACTIVE,

        ])->andWhere(['in', 'role', $roles])->one();

        if (
            $user !== null &&
            ($user->getIsBlocked() == true || $user->getIsConfirmed() == false)
        ) {
            return null;
        }

        return $user;
    }

    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }
        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    public static function isPasswordResetTokenValid(string $token): bool
    {
        if (empty($token)) {
            return false;
        }
        $timestamp = (int) substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    public static function findIdentityWithoutValidation($id)
    {
        $user = static::findOne(['id' => $id]);

        return $user;
    }

    // Additional specific identity methods
    protected static function getSecretKey()
    {
        return Yii::$app->params['jwt.secret'];
    }

    public static function getAlgo(): string
    {
        return 'HS256';
    }

    public static function findByJTI($id)
    {
        return static::findOne([
            'id' => $id,
            'status' => self::STATUS_ACTIVE,
            ['>', 'access_token_expired_at', new Expression('UNIX_TIMESTAMP()')],
        ]);
    }
}
