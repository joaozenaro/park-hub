<?php

namespace app\core\models\auth;

use app\core\models\User;
use Yii;
use yii\base\Model;

class SignupForm extends Model
{
    public $email;
    public $role;

    public function rules()
    {
        return [
            [['email', 'role'], 'trim'],
            [['email', 'role'], 'required'],
            ['email', 'string', 'min' => 2, 'max' => 120],
            ['email', 'unique', 'targetClass' => User::class],
            ['email', 'email'],
            ['role', 'validateRole'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'email' => Yii::t('app', 'Email'),
            'role' => Yii::t('app', 'Role'),
        ];
    }

    public function validateRole($attribute, $params)
    {
        $auth = Yii::$app->authManager;
        $role = $auth->getRole($this->$attribute);

        if ($role === null) {
            $this->addError($attribute, Yii::t('app', 'Cargo invalido.'));
        }
    }
}
