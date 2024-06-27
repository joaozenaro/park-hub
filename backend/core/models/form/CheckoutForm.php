<?php

namespace app\core\models\form;

use app\core\components\SaveModelTrait;
use app\core\models\base\Reservation;
use DateTime;
use yii\base\Model;

class CheckoutForm extends Model
{
    use SaveModelTrait;

    public $was_paid;
    public $check_out;
    public $price;

    public function rules() {
        return [
            [['was_paid', 'check_out'], 'boolean'],
            ['price', 'double'],
        ];
    }

    public function reservationSave(int $id)
    {
        if ($this->validate()) {
            $res = Reservation::findOne($id);
            if (!$res) return null;

            if ($this->was_paid && $res->was_paid === 0) {
                $res->was_paid = true;
                $this->check_out = true;
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