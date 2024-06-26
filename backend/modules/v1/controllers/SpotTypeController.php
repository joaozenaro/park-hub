<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\SearchModel;
use app\core\models\SpotType;
use Yii;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;

class SpotTypeController extends Controller
{
    public $modelClass = SpotType::class;

    public function __construct(
        $id,
        $module,
        $config = []
    ) {
        parent::__construct($id, $module, $config);
    }

    public function actionView(int $id)
    {
        $model = SpotType::find()
            ->where(['id' => $id])
            ->one();

        if (!$model) {
            throw new NotFoundHttpException("Tipo de Vaga id: $id não foi encontrada");
        }

        return $model;
    }

    public function actionAdd(): SpotType | array | null
    {
        $model = new SpotType();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        if (!$model->saveModel($model)) return null;

        return $model;
    }

    public function actionUpdate(int $id): SpotType | array | null
    {
        $spotType = SpotType::find()
            ->where(['id' => $id])
            ->one();

        $spotType->load(Yii::$app->request->post());;
        if (!$spotType->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $spotType->getErrors());
        }

        if (!$spotType->saveModel($spotType)) return null;

        return SpotType::find()
            ->where(['id' => $id])
            ->one();
    }

    public function actionSearch()
    {
        $searchModel = new SearchModel();
        $searchModel->load(Yii::$app->request->post());

        $search = SpotType::find();

        if ($searchModel->searchTerm) {
            $search->where(['like', 'name', '%' . $searchModel->searchTerm . '%', false]);
        }

        $take = $searchModel->take ?? 10;
        $skip = $searchModel->skip ?? 0;

        return $search->limit($take)
            ->offset($skip)
            ->all();
    }

    public function actionDelete(int $id)
    {
        if (SpotType::deleteAll(['id' => $id]) > 0) {
            return ResponseHelper::Success("Tipo de Vaga id: $id removido com sucessso");
        }

        return ResponseHelper::BadRequest("Tipo de Vaga id: $id não foi possivel ser removido");
    }
}