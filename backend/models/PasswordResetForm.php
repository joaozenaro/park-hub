<?php

namespace app\models;

use yii\base\Model;

class PasswordResetForm extends Model
{
    private User $_user;
    public $token;
    public $password;

    public function rules()
    {
        return [
            ['token', 'required'],
            ['token', 'validatePasswordResetToken'],
            ['password', 'required'],
            ['password', 'string', 'min' => 6],

        ];
    }

    public function validatePasswordResetToken($attribute, $params)
    {
        $this->_user = User::findByPasswordResetToken($this->$attribute);

        if (!$this->_user) {
            $this->addError($attribute, 'Incorrect password reset token.');
        }
    }

    public function resetPassword()
    {
        $user = $this->_user;
        $user->setPassword($this->password);
        $user->password_reset_token = null;

        return $user->save(false);
    }
}
