<?php

namespace app\commands;

use Yii;
use yii\console\Controller;

class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = Yii::$app->authManager;
        $auth->removeAll();

        $adminRole = $auth->createRole('admin');
        $userRole = $auth->createRole('user');
        $auth->add($adminRole);
        $auth->add($userRole);

        $manageUsers = $auth->createPermission('manageUsers');
        $manageUsers->description = 'Manage users';
        $auth->add($manageUsers);

        // Assign permissions to roles
        $auth->addChild($adminRole, $manageUsers);

        $auth->assign($adminRole, 1); // Fixed admin id
        $auth->assign($userRole, 2); // Fixed user id
    }
}
