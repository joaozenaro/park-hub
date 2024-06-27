<?php

namespace app\core\models\form;

use Yii;
use yii\base\Model;

class SpotReservationsSearchForm extends Model
{
    public $license_plate;
    public $floor;
    public $skip;
    public $take;

    public function rules()
    {
        return [
            [['license_plate', 'floor'], 'string'],
            [['skip', 'take'], 'integer'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'license_plate' => Yii::t('app', 'Placa'),
            'floor' => Yii::t('app', 'Andar'),
        ];
    }
}