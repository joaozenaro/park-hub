<?php

namespace app\modules\v1\controllers;

use app\core\models\base\Reservation;
use DateTime;
use Yii;
use yii\db\Query;
use yii\rest\Controller;

class DashboardController extends Controller
{
    public $modelClass = Reservation::class;

    public function actionHistory()
    {
        // Define dates
        $today = new DateTime();
        $weekAgo = (clone $today)->modify('-7 days');
        $monthAgo = (clone $today)->modify('-1 month');
        $yearAgo = (clone $today)->modify('-1 year');

        $amountToday = (float) $this->getTotalReservations($today, $today);
        $amountWeek = (float) $this->getTotalReservations($weekAgo, $today);
        $amountMonth = (float) $this->getTotalReservations($monthAgo, $today);
        $amountYear = (float) $this->getTotalReservations($yearAgo, $today);

        $spot_type_period = Yii::$app->request->post("spot_type_period");

        // Amount by spot type
        $amountBySpotType = match($spot_type_period) {
            "week" => $this->getAmountBySpotType($weekAgo, $today),
            "month" => $this->getAmountBySpotType($monthAgo, $today),
            "year" => $this->getAmountBySpotType($yearAgo, $today),
            default => $this->getAmountBySpotType($weekAgo, $today)
        };

        return [
            'amount_today' => $amountToday,
            'average_amount_week' => $amountWeek / 7,
            'amount_week' => $amountWeek,
            'average_amount_month' => $amountMonth / 30,
            'amount_month' => $amountMonth,
            'average_amount_year' => $amountYear / 365,
            'amount_by_spot_type' => $amountBySpotType,
        ];
    }

    private function getTotalReservations($startDate, $endDate)
    {
        $total = Reservation::find()
            ->where(['>=', 'check_in', $startDate->format('Y-m-d 00:00:00')])
            ->andWhere(['<=', 'check_in', $endDate->format('Y-m-d 23:59:59')])
            ->andWhere(['was_paid' => true])
            ->sum('price');

        return $total;
    }

    private function getAmountBySpotType($startDate, $endDate)
    {
        $amountBySpotType = (new Query())
            ->select(['spot_type.name AS spotType', 'SUM(reservation.price) AS total_price'])
            ->from('reservation')
            ->innerJoin('spot', 'reservation.spot_id = spot.id')
            ->innerJoin('spot_type', 'spot.spot_type_id = spot_type.id')
            ->where(['>=', 'reservation.check_in', $startDate->format('Y-m-d 00:00:00')])
            ->andWhere(['<=', 'reservation.check_in', $endDate->format('Y-m-d 23:59:59')])
            ->andWhere(['reservation.was_paid' => true])
            ->groupBy('spot_type.name')
            ->all();

        return $amountBySpotType;
    }
}