<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\SearchModel;
use app\core\models\Spot;
use app\core\models\SpotType;
use Exception;
use Yii;
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
            ->with('spotType')
            ->one();

        if (!$model) {
            throw new NotFoundHttpException("Vaga id: $id não foi encontrada");
        }

        return $model;
    }

    public function actionAdd(): Spot | array | null
    {
        $model = new Spot();
        $model->load(Yii::$app->request->post());

        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        $spotType = SpotType::find()->where(["name" => $model->spot_type_name])->one();
        if ($spotType === null) {
            return ResponseHelper::UnprocessableEntity("SpotType not found", []);
        }
        $model->spot_type_id = $spotType->getPrimaryKey();

        try {
            if (!$model->saveModel($model)) {
                return null;
            }
        } catch (Exception $e) {
            return [$e->getMessage()];
        }

        $model = Spot::find()->where(['id' => $model->id])->with('spotType')->one();

        return $model;
    }

    public function actionUpdate(int $id): Spot | array | null
    {
        $spot = Spot::find()
            ->where(['id' => $id])
            ->with('spotType')
            ->one();
        $spot->load(Yii::$app->request->post());

        $spotType = SpotType::find()->where(["name" => $spot->spot_type_name])->one();
        if ($spotType === null) {
            return ResponseHelper::UnprocessableEntity("SpotType not found", []);
        }
        $spot->spot_type_id = $spotType->getPrimaryKey();

        if (!$spot->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $spot->getErrors());
        }

        if (!$spot->saveModel($spot)) {
            return null;
        }

        return $spot = Spot::find()
            ->where(['id' => $id])
            ->with('spotType')
            ->one();
    }

    public function actionSearch()
    {
        $searchModel = new SearchModel();
        $searchModel->load(Yii::$app->request->post());

        $search = Spot::find();

        if ($searchModel->startDate) {
            $search->andWhere(['>=', 'created_at', date('Y-m-d', strtotime($searchModel->startDate))]);
        }

        if ($searchModel->endDate) {
            $search->andWhere(['<=', 'created_at', date('Y-m-d', strtotime($searchModel->endDate))]);
        }

        $take = $searchModel->take ?? 10;
        $skip = $searchModel->skip ?? 0;

        $totalCount = $search->count();

        $records = $search->limit($take)
            ->offset($skip)
            ->with("spotType")
            ->all();

        return $this->asJson(["records" => $records, "total_count" => $totalCount]);
    }

    public function actionDelete(int $id)
    {
        if (Spot::deleteAll(['id' => $id]) > 0) {
            return ResponseHelper::Success("Vaga id: $id removido com sucessso");
        }

        return ResponseHelper::BadRequest("Vaga id: $id não foi possivel ser removido");
    }
}
