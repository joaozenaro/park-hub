<?php

namespace app\core\models\auth;

use app\core\models\User;
use Yii;
use yii\base\Model;

class CompleteSignupForm extends Model
{
    public $id;
    public $token;
    public $name;
    public $username;
    public $password;

    public function rules()
    {
        return [
            [['name', 'username'], 'trim'],
            [['id', 'token', 'name', 'username', 'password'], 'required'],
            [
                'name',
                'match',
                'pattern' => '/^[^0-9<>~!?\-\_]+$/i',
                'message' => Yii::t('app', '{attribute} somente deve conter letras.'),
            ],
            [
                'username',
                'match',
                'pattern' => '/^[a-z]\w*$/i',
                'message' => Yii::t('app', '{attribute} somente deve conter numeros e letras.'),
            ],
            ['username', 'unique', 'targetClass' => User::class],
            ['username', 'string', 'min' => 4, 'max' => 60],
            ['password', 'required'],
            ['password', 'string', 'min' => 6],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'Id'),
            'token' => Yii::t('app', 'Token'),
            'name' => Yii::t('app', 'Nome'),
            'username' => Yii::t('app', 'Username'),
            'password' => Yii::t('app', 'Senha'),
        ];
    }
}