<?php

namespace app\core\models\auth;

use app\core\models\User;
use Yii;
use yii\base\Model;

class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;

    public function rules()
    {
        return [
            [['username', 'email'], 'trim'],
            [['username', 'email'], 'required'],

            [
                'username',
                'match',
                'pattern' => '/^[a-z]\w*$/i',
                'message' => Yii::t('app', '{attribute} somente deve conter numeros e letras.'),
            ],
            ['username', 'unique', 'targetClass' => User::class],
            ['username', 'string', 'min' => 4, 'max' => 60],

            ['email', 'string', 'min' => 2, 'max' => 120],
            ['email', 'unique', 'targetClass' => User::class],
            ['email', 'email'],

            ['password', 'required'],
            ['password', 'string', 'min' => 6],
        ];
    }

    public function attributeLabels()
    {
        return [
            'username' => Yii::t('app', 'Username'),
            'password' => Yii::t('app', 'Password'),
            'email' => Yii::t('app', 'Email'),
        ];
    }
}
