<?php

namespace app\core\models;

use app\core\types\UserStatus;
use DateTime;
use Firebase\JWT\JWT;
use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $username
 * @property string|null $avatar
 * @property string $auth_key
 * @property string $password_hash
 * @property string|null $password_reset_token
 * @property string|null $email
 * @property int|null $status
 * @property int|null $created_at
 * @property int|null $updated_at
 *
 * @property-write string $password
 * @property-read string $authKey
 */
class User extends ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return '{{%user}}';
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
                'value' => date('Y-m-d H:i:s'),
            ],
        ];
    }

    public function rules()
    {
        return [
            ['status', 'default', 'value' => UserStatus::PENDING],
            ['status', 'in', 'range' => [UserStatus::ACTIVE, UserStatus::PENDING]],
            [['username'], 'string', 'max' => 60],
        ];
    }

    public static function findIdentity($id)
    {
        return static::find()
            ->where(['id' => $id, 'status' => UserStatus::ACTIVE])
            ->limit(1)
            ->one();
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        $decodedToken = (array) JWT::decode($token, Yii::$app->params['jwt.secret'], [Yii::$app->params['jwt.algo']]);
        $userId = $decodedToken['jti'];

        return self::findIdentity($userId);
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    public function fields()
    {
        $fields = parent::fields();
        unset($fields['auth_key'], $fields['password_hash'], $fields['password_reset_token']);

        $fields['created_at'] = function (self $model) {
            return date(DateTime::ATOM, strtotime($model->created_at));
        };

        $fields['updated_at'] = function (self $model) {
            return date(DateTime::ATOM, strtotime($model->updated_at));
        };

        return $fields;
    }
}
