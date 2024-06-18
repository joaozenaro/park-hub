<?php

namespace app\models;

use Yii;
use yii\base\Model;

class LoginForm extends Model
{
    public $username;
    public $password;
    public $roles = [];
    public $rememberMe = true;
    private ?User $_user = null;

    public function rules()
    {
        return [
            [['username', 'password'], 'required'],
            ['rememberMe', 'boolean'],
            ['password', 'validatePassword'],
        ];
    }

    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUserByUsername();

            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, 'Incorrect username or password.');
            }
        }
    }

    public function getUserByUsername()
    {
        // Roles must be set to get a user
        if (empty($this->roles)) {
            return null;
        }
        if ($this->_user === null) {
            $this->_user = User::findByUsernameWithRoles($this->username, $this->roles);
        }

        return $this->_user;
    }

    public function login()
    {
        if (!$this->validate()) {
            return false;
        }

        return Yii::$app->user->login($this->getUserByUsername(), $this->rememberMe ? 3600 * 24 * 30 : 0);
    }

    public function getUser()
    {
        return $this->_user;
    }
}
