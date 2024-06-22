<?php

namespace app\modules\v1\controllers;

use app\core\models\Spot;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;

class SpotController extends Controller
{
    public $modelClass = Spot::class;

    public function __construct(
        $id,
        $module,
        $config = []
    ) {
        parent::__construct($id, $module, $config);
    }

    public function actionView(int $id)
    {
        $model = Spot::find()
            ->where(['id' => $id])
            ->one();

        if (!$model) {
            throw new NotFoundHttpException("Vaga id: $id não foi encontrada");
        }

        return $model;
    }

    public function actionAdd()
    {
        return "ok";
    }
}