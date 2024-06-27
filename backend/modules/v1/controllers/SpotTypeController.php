<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\base\SpotType;
use app\core\models\SearchModel;
use Yii;
use yii\rest\Controller;

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
        $spotType = SpotType::findOne($id);
        if (!$spotType) {
            return ResponseHelper::NotFound("Tipo de vaga não encontrado");
        }

        return $spotType;
    }

    public function actionAdd(): SpotType | array | null
    {
        $model = new SpotType();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        if (!$model->saveModel($model)) {
            return null;
        }

        return $model;
    }

    public function actionUpdate(int $id): SpotType | array | null
    {
        $spotType = SpotType::findOne($id);

        if (!$spotType) {
            return ResponseHelper::NotFound("Tipo de vaga não encontrado");
        }

        $spotType->load(Yii::$app->request->post());
        if (!$spotType->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $spotType->getErrors());
        }

        if (!$spotType->saveModel($spotType)) {
            return null;
        }

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
            return ResponseHelper::Success("Tipo de vaga id: $id removido com sucessso");
        }

        return ResponseHelper::BadRequest("Tipo de vaga id: $id não foi possivel ser removido");
    }
}
