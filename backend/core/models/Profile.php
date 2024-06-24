<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use app\core\models\User;
use Yii;
use yii\base\Model;

class Profile extends Model
{
    use SaveModelTrait;

    public $username;
    public $name;
    public $avatar;

    public function rules()
    {
       return [
            [['name', 'username', 'avatar'], 'trim'],
            ['username', 'unique', 'targetClass' => User::class],
            ['username', 'string', 'min' => 4, 'max' => 60],
            ['avatar', 'string', 'max' => 300],
        ];
    }

    public function profileSave()
    {
        if ($this->validate()) {
            $user = User::findOne(Yii::$app->user->id);
            if ($this->username) $user->username = $this->username;
            if ($this->name) $user->name = $this->name;
            if ($this->avatar) $user->avatar = $this->avatar;

            if ($this->saveModel($user)) {
                return $user;
            }
        }

        return null;
    }
}
