<?php

namespace app\models;

use yii\base\Model;

class PasswordResetTokenVerificationForm extends Model
{
    public $token;
    private User $_user;

    public function rules()
    {
        return [
            ['token', 'required'],
            ['token', 'validatePasswordResetToken'],
        ];
    }

    public function validatePasswordResetToken($attribute, $params)
    {
        $this->_user = User::findByPasswordResetToken($this->$attribute);

        if (!$this->_user) {
            $this->addError($attribute, 'Incorrect password reset token.');
        }
    }
}
