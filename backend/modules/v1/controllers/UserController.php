<?php

namespace app\modules\v1\controllers;

use app\core\interfaces\IUserService;
use app\core\models\User;
use app\core\models\auth\{LoginForm, SignupForm};
use app\core\models\PasswordResetForm;
use Yii;
use yii\rest\ActiveController;

class UserController extends ActiveController
{
    public $modelClass = User::class;
    public $noAuthActions = ['signup', 'login'];

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

    public function actionValidateToken()
    {
        return "ok";
    }

    public function actionSignup()
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
            Yii::$app->response->statusCode = 422;
            return $errors;
        }

        $user = Yii::$app->user->identity;
        $token = $this->userService->getToken($user->getId(), $user->username);
        $userRole = Yii::$app->authManager->getRolesByUser($user->getId());

        return [
            'user' => $user,
            'role' => $userRole,
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
        if (!empty(Yii::$app->request->get())) {
            $id = Yii::$app->getRequest()->getQueryParam('id');
            $auth_key = Yii::$app->getRequest()->getQueryParam('auth_key');

            try {
                if ($this->userService->confirmUser($id, $auth_key)) {
                    Yii::$app->getResponse()->setStatusCode(200);
                    return $this->redirect(['/confirm?status=confirmado']);
                }

            } catch (\Throwable $th) {}
        }

        return $this->redirect(['/confirm']);
    }

    /**
     * Action to handle the user request of changing their password
     */
    public function actionRequestPasswordReset()
    {
        $email = Yii::$app->request->post("email");

        if (!isset($email)) {
            Yii::$app->response->statusCode = 422;
            return $this->asJson([
                "message" => "Parametro email invalido."
            ]);
        }
        
        if ($this->userService->requestPasswordReset($email)) {
            return $this->asJson([
                "message" => "sucesso"
            ]);
        }

        Yii::$app->response->statusCode = 400;
        return $this->asJson([
            "message" => "Não foi possível enviar o email."
        ]);
    }

    /**
     * Action to effectively change the user's password
     */
    public function actionPasswordReset()
    {
        $model = new PasswordResetForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            $errors = $model->getErrors();
            Yii::$app->response->statusCode = 422;
            return $errors;
        }

        if ($this->userService->resetPassword($model)) {
            return $this->asJson([
                "message" => "sucesso"
            ]);
        }

        Yii::$app->response->statusCode = 400;
        return $this->asJson([
            "message" => "\"id\" ou \"token\" inválido."
        ]);
    }

    public function actionAdminAction()
    {
        $usr = Yii::$app->user;
        $temp = Yii::$app->user->can('manageUsers');
        if (!$temp) {
            throw new \yii\web\ForbiddenHttpException('You are not allowed to perform this action.');
        }
        
        return "AdminOnly";
    }
}
