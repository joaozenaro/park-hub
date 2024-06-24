<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\interfaces\IUserService;
use app\core\models\auth\CompleteSignupForm;
use app\core\models\auth\SignupForm;
use app\core\models\Profile;
use app\core\models\SearchModel;
use app\core\models\User;
use Yii;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;

class UserController extends Controller
{
    public $modelClass = User::class;

    private $userService;

    public function __construct(
        $id,
        $module,
        IUserService $userService,
        $config = []
    ) {
        $this->userService = $userService;
        parent::__construct($id, $module, $config);
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

    public function actionView(int $id)
    {
        $model = User::find()
            ->where(['id' => $id])
            ->one();

        if (!$model) {
            throw new NotFoundHttpException("Usuario id: $id não foi encontrada");
        }

        return $model;
    }

    public function actionUpdate(int $id): User | array | null
    {
        $model = new Profile();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        $user = $model->profileSave($id);

        return $user;
    }

    public function actionSearch()
    {
        $searchModel = new SearchModel();
        $searchModel->load(Yii::$app->request->post());

        $search = User::find();

        if ($searchModel->searchTerm) {
            $search->where(['like', 'name', '%' . $searchModel->searchTerm . '%', false]);
        }

        if ($searchModel->startDate) {
            $search->andWhere(['>=', 'created_at', date('Y-m-d H:i:s', strtotime($searchModel->startDate))]);
        }
    
        if ($searchModel->endDate) {
            $search->andWhere(['<=', 'created_at', date('Y-m-d H:i:s', strtotime($searchModel->endDate))]);
        }

        $take = $searchModel->take ?? 10;
        $skip = $searchModel->skip ?? 0;

        return $search->limit($take)
            ->offset($skip)
            ->all();
    }

    public function actionDelete(int $id)
    {
        if (User::deleteAll(['id' => $id]) > 0) {
            return ResponseHelper::Success("Usuario id: $id removido com sucessso");
        }

        return ResponseHelper::BadRequest("Usuario id: $id não foi possivel ser removido");
    }
}
