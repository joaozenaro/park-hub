<?php

namespace app\modules\v1\controllers;

use app\core\interfaces\IUserService;
use app\core\models\User;
use app\core\models\auth\{LoginForm, SignupForm};
use Yii;
use yii\rest\ActiveController;

class UserController extends ActiveController
{
    public $modelClass = User::class;
    public $noAuthActions = ['join', 'login'];

    public $userService;

    public function __construct(
        $id,
        $module,
        IUserService $userService,
        $config = []) {
        $this->userService = $userService;
        parent::__construct($id, $module, $config);
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['update'], $actions['index'], $actions['delete'], $actions['create']);
        return $actions;
    }

    public function actionView($id)
    {
        return "ok";
    }

    public function actionJoin()
    {
        $model = new SignupForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            $errors = $model->getErrors();
            return $errors;
        }

        return $this->userService->createUser($model);
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            $errors = $model->getErrors();
            return $errors;
        }

        $user = Yii::$app->user->identity;
        $token = $this->userService->getToken($user->getId(), $user->username);

        return [
            'user' => $user,
            'token' => (string) $token,
        ];
    }

    public function actionRefreshToken()
    {
        $user = Yii::$app->user->identity;
        $token = $this->userService->getToken($user->getId(), $user->username);
        return [
            'user' => $user,
            'token' => (string) $token,
        ];
    }

    public function actionConfirm()
    {
        $id = Yii::$app->getRequest()->getQueryParam('id');
        $auth_key = Yii::$app->getRequest()->getQueryParam('auth_key');

        if ($this->userService->confirmUser($id, $auth_key)) {
            Yii::$app->getResponse()->setStatusCode(200);
            return $this->redirect(['/confirm?status=confirmado']);
        }

        return $this->redirect(['/confirm']);
    }
}
