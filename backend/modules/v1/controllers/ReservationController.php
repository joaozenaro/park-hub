<?php

namespace app\modules\v1\controllers;

use app\core\components\ResponseHelper;
use app\core\models\base\Reservation;
use app\core\models\base\Spot;
use app\core\models\form\CheckinForm;
use app\core\models\form\CheckoutForm;
use app\core\models\SearchModel;
use DateTime;
use Yii;
use yii\rest\Controller;

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
        $model = Reservation::findOne($id);

        if (!$model) {
            return ResponseHelper::NotFound("Reserva não encontrada");
        }

        return $model;
    }

    public function actionAdd(): Reservation | array | null
    {
        $model = new CheckinForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        $isReserved = Spot::getCurrentReservation($model->spot_id);
        if ($isReserved) {
            return ResponseHelper::BadRequest("Vaga já está em uso.");
        }

        $reservation = new Reservation();
        $reservation->license_plate = $model->license_plate;
        $reservation->spot_id = $model->spot_id;
        $reservation->user_id = Yii::$app->user->id;

        $sql = <<<SQL
            SELECT default_price
            FROM spot_type st
            INNER JOIN spot s ON st.id = s.spot_type_id
            WHERE s.id = $model->spot_id
        SQL;
        str_replace("\n", "", $sql);

        $spotTypeDefaultPrice = Yii::$app->getDb()->createCommand($sql)->queryScalar();

        $reservation->price = $spotTypeDefaultPrice;
        $reservation->check_in = date(DateTime::ATOM, strtotime("now"));

        if (!$reservation->saveModel($reservation)) {
            return null;
        }

        return Reservation::findOne($reservation->id);
    }

    public function actionUpdate(int $id): Reservation | array | null
    {
        $model = new CheckoutForm();
        $model->load(Yii::$app->request->post());
        if (!$model->validate()) {
            return ResponseHelper::UnprocessableEntity("Modelo invalido", $model->getErrors());
        }

        if (!$model->reservationSave($id)) {
            return ResponseHelper::NotFound("Reserva não encontrada");
        }

        return Reservation::findOne($id);
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
