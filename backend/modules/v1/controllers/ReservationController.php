<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\SearchModel;
use app\core\models\Reservation;
use app\core\models\ReservationForm;
use DateTime;
use Yii;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;

class ReservationController extends Controller
{
    public $modelClass = Reservation::class;

    public function __construct(
        $id,
        $module,
        $config = []
    ) {
        parent::__construct($id, $module, $config);
    }

    public function actionView(int $id)
    {
        $model = Reservation::find()
            ->where(['id' => $id])
            ->one();

        if (!$model) {
            throw new NotFoundHttpException("Reserva id: $id não foi encontrada");
        }

        return $model;
    }

    public function actionAdd(): Reservation | array | null
    {
        $model = new Reservation();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        $model->user_id = Yii::$app->user->id;

        $sql = <<<SQL
            SELECT default_price 
            FROM spot_type st
            INNER JOIN spot s ON st.id = s.spot_type_id
            WHERE s.id = $model->spot_id
        SQL;
        str_replace("\n", "", $sql);

        $spotTypeDefaultPrice = Yii::$app->getDb()->createCommand($sql)->queryScalar();

        $model->price = $spotTypeDefaultPrice;
        $model->check_in = date(DateTime::ATOM, strtotime("now"));

        if (!$model->saveModel($model)) {
            return null;
        }

        return Reservation::find()->where(['id' => $model->id])->one();
    }

    public function actionUpdate(int $id): Reservation | array | null
    {
        $model = new ReservationForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }
        
        if (!$model->reservationSave($id)) {
            return null;
        }

        return Reservation::find()
            ->where(['id' => $id])
            ->one();
    }

    public function actionSearch()
    {
        $searchModel = new SearchModel();
        $searchModel->load(Yii::$app->request->post());

        $search = Reservation::find();

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
            ->all();

        return $this->asJson(["records" => $records, "total_count" => $totalCount]);
    }

    public function actionDelete(int $id)
    {
        if (Reservation::deleteAll(['id' => $id]) > 0) {
            return ResponseHelper::Success("Reserva id: $id removido com sucessso");
        }

        return ResponseHelper::BadRequest("Reserva id: $id não foi possivel ser removido");
    }
}
