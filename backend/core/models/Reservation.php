<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use yii\db\ActiveRecord;

class Reservation extends ActiveRecord
{
    use SaveModelTrait;

    public static function tableName()
    {
        return '{{%reservation}}';
    }

    public function rules()
    {
        return [
            [['license_plate'], 'trim'],
            [['license_plate', 'spot_id'], 'required'],
            [
                ['license_plate'],
                'match',
                'pattern' => '/^[a-zA-Z0-9]{7}$/',
                'message' => 'Placa invalida. A placa deve conter 7 caracteres alfanumericos.',
            ],
            [['license_plate'], 'filter', 'filter' => 'strtoupper'],
            [['spot_id'], 'exist', 'targetClass' => Spot::class, 'targetAttribute' => 'id'],
            [['user_id'], 'exist', 'targetClass' => User::class, 'targetAttribute' => 'id'],
            [['price'], 'number'],
        ];
    }
}
