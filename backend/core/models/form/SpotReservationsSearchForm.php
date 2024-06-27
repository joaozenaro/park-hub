<?php

namespace app\core\models\form;

use Yii;
use yii\base\Model;

class SpotReservationsSearchForm extends Model
{
    public $licensePlate;
    public $floor;
    public $skip;
    public $take;

    public function rules()
    {
        return [
            [['licensePlate', 'floor'], 'string'],
            [['skip', 'take'], 'integer'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'licensePlate' => Yii::t('app', 'Placa'),
            'floor' => Yii::t('app', 'Andar'),
        ];
    }
}