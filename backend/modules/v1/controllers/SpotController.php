<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\Reservation;
use app\core\models\SearchModel;
use app\core\models\Spot;
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

        if (!$model->saveModel($model)) {
            return null;
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
        if (!$spot->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $spot->getErrors());
        }

        $spot->spot_type_id = $spot->spot_type_id;

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

    public function actionReservations()
    {
        $searchModel = new SearchModel();
        $searchModel->load(Yii::$app->request->post());
    
        $query = Spot::find()->with(['spotType', 'reservations.user']);
    
        if ($searchModel->startDate) {
            $query->andWhere(['>=', 'created_at', date('Y-m-d', strtotime($searchModel->startDate))]);
        }
    
        if ($searchModel->endDate) {
            $query->andWhere(['<=', 'created_at', date('Y-m-d', strtotime($searchModel->endDate))]);
        }
    
        $take = $searchModel->take ?? 10;
        $skip = $searchModel->skip ?? 0;
    
        $totalCount = $query->count();
    
        $records = $query
            ->limit($take)
            ->offset($skip)
            ->all();
    
        $response = [];
        foreach ($records as $spot) {
            $spotData = $spot->toArray();
            $spotData['reservations'] = array_map(function($reservation) {
                $reservation->scenario = Reservation::SCENARIO_NO_SPOT;
                return $reservation->toArray();
            }, $spot->reservations);
            $response[] = $spotData;
        }
    
        return $this->asJson(["records" => $response, "total_count" => $totalCount]);
    }    
}
