<?php

namespace app\modules\v1\controllers;

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

    public function actionAdd(): SpotType|array|null
    {
        $model = new SpotType();
        $model->load(Yii::$app->request->post());

        if (!$model->validate()) {
            return $model->getErrors();
        }

        if (!$model->saveModel($model)) {
            return null;
        }

        return $model;
    }

    public function actionUpdate(int $id): SpotType|array|null
    {
        $spotType = SpotType::find($id)->one();
        $spotType->load(Yii::$app->request->post());

        if (!$spotType->validate()) {
            return $spotType->getErrors();
        }

        if (!$spotType->saveModel($spotType)) {
            return null;
        }

        return $spotType;
    }

    public function actionSearch()
    {
        $spotType = SpotType::find();
        $spotType->load(Yii::$app->request->post());

        if (!$spotType->validate()) {
            return $spotType->getErrors();
        }

        if (!$spotType->saveModel($spotType)) {
            return null;
        }

        return $spotType;
    }

    public function actionDelete(int $id): int
    {
        return SpotType::deleteAll(['id' => $id]);
    }
}