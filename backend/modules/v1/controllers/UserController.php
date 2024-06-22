<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\interfaces\{IAuthService,IUserService};
use app\core\models\{User,PasswordResetForm};
use app\core\models\auth\{CompleteSignupForm, LoginForm, SignupForm};
use Yii;
use yii\rest\ActiveController;

class UserController extends ActiveController
{
    public $modelClass = User::class;

    private $userService;
    private $authService;

    public function __construct(
        $id,
        $module,
        IUserService $userService,
        IAuthService $authService,
        $config = []
    ) {
        $this->userService = $userService;
        $this->authService = $authService;
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
        if (!Yii::$app->user->can("manageUsers")) {
            throw new \yii\web\ForbiddenHttpException("Você não possui permissão para efetuar essa ação.");
        }

        $model = new SignupForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        if ($this->userService->preRegisterUser($model)) {
            return ResponseHelper::Created("Usuario criado com sucesso.");
        }

        return ResponseHelper::BadRequest("Houve um problema ao criar o usuario.");
    }

    public function actionCompleteSignup()
    {
        $model = new CompleteSignupForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        if ($this->userService->completeUserSignup($model)) {
            return ResponseHelper::Success("Usuario atualizado com sucesso.");
        }

        return ResponseHelper::BadRequest("Houve um problema ao atualizar o usuario.");
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
        $token = $this->authService->getToken($user->getId(), $user->username);
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
        $token = $this->authService->getToken($user->getId(), $user->username);
        return [
            'user' => $user,
            'token' => (string) $token,
        ];
    }

    /**
     * Action to handle the user request of changing their password
     */
    public function actionRequestPasswordReset()
    {
        $email = Yii::$app->request->post("email");

        if (!isset($email)) return ResponseHelper::UnprocessableEntity("Parametro email invalido.");
        
        if ($this->userService->requestPasswordReset($email)) {
            return ResponseHelper::Success("Email enviado com sucesso.");
        }

        return ResponseHelper::BadRequest("Não foi possível enviar o email.");
    }

    /**
     * Action to effectively change the user's password
     */
    public function actionPasswordReset()
    {
        $model = new PasswordResetForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        if ($this->userService->resetPassword($model)) {
            return ResponseHelper::Success("Senha redefinida com sucesso.");
        }

        return ResponseHelper::UnprocessableEntity("\"id\" ou \"token\" inválido.");
    }
}
