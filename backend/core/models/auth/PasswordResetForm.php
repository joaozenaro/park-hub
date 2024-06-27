<?php

namespace app\core\models\auth;

use Yii;
use yii\base\Model;

class PasswordResetForm extends Model
{
    public $id;
    public $token;
    public $password;

    public function rules()
    {
        return [
            [['id', 'token', 'password'], 'required'],
            ['password', 'string', 'min' => 6],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'Id'),
            'token' => Yii::t('app', 'Token'),
            'password' => Yii::t('app', 'Senha'),
        ];
    }
}
