<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use DateTime;
use yii\base\Model;

class ReservationForm extends Model
{
    use SaveModelTrait;

    public $paid;
    public $check_out;
    public $price;

    public function rules() {
        return [
            [['paid', 'check_out'], 'boolean'],
            ['price', 'double'],
        ];
    }

    public function reservationSave(int $id)
    {
        if ($this->validate()) {
            $res = Reservation::findOne($id);

            if ($this->paid && $res->was_paid === 0) {
                $res->was_paid = true;
            }

            if ($this->check_out) {
                $res->check_out ??= date(DateTime::ATOM, strtotime("now"));
            }

            if ($this->price) {
                $res->price = (string)$this->price;
            }

            if ($this->saveModel($res)) {
                return $res;
            }
        }

        return null;
    }
}