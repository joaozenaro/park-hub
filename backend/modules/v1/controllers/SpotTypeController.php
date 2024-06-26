<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\SearchModel;
use app\core\models\SpotType;
use Exception;
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
            throw new NotFoundHttpException("Usuario id: $id não foi encontrada");
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

        try {
            if (!$model->saveModel($model)) return null;

        } catch (Exception $e) {
            return [$e->getMessage()];
        }

        return $model;
    }

    public function actionUpdate(int $id): SpotType | array | null
    {
        $model = new SpotType();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        $spotType = $model->saveModel($model);

        return $spotType;
    }

    public function actionSearch()
    {
        $searchModel = new SearchModel();
        $searchModel->load(Yii::$app->request->post());

        $search = SpotType::find();

        if ($searchModel->searchTerm) {
            $search->where(['like', 'name', '%' . $searchModel->searchTerm . '%', false]);
        }

        if ($searchModel->startDate) {
            $search->andWhere(['>=', 'created_at', date('Y-m-d', strtotime($searchModel->startDate))]);
        }
    
        if ($searchModel->endDate) {
            $search->andWhere(['<=', 'created_at', date('Y-m-d', strtotime($searchModel->endDate))]);
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
            return ResponseHelper::Success("Usuario id: $id removido com sucessso");
        }

        return ResponseHelper::BadRequest("Usuario id: $id não foi possivel ser removido");
    }
}