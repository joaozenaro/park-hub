<?php

namespace app\commands;

use app\models\User;
use InvalidArgumentException;
use yii\console\Controller;

class RbacController extends Controller
{
    public function actionAssign($role, $username)
    {
        $user = User::find()->where(['username' => $username])->one();
        if (!$user) {
            throw new InvalidArgumentException("There is no user \"$username\".");
        }

        $auth = \Yii::$app->authManager;
        $roleObject = $auth->getRole($role);
        if (!$roleObject) {
            throw new InvalidArgumentException("There is no role \"$role\".");
        }

        $auth->assign($roleObject, $user->id);
    }
}
