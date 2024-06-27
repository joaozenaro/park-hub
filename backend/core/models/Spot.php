<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use yii\db\ActiveRecord;

class Spot extends ActiveRecord
{
    use SaveModelTrait;

    public static function tableName()
    {
        return '{{spot}}';
    }

    public function rules()
    {
        return [
            [['code', 'floor'], 'trim'],
            [['code', 'floor', 'spot_type_id'], 'required'],
            [['code', 'floor'], 'string', 'max' => 20],
            [['code', 'floor'], 'filter', 'filter' => 'strtoupper'],
            ['code', 'unique', 'targetClass' => Spot::class],
            [['spot_type_id'], 'exist', 'targetClass' => SpotType::class, 'targetAttribute' => 'id'],
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        unset($fields['spot_type_id']);

        $fields['spotType'] = function ($model) {
            return $model->spotType;
        };

        return $fields;
    }

    public function getSpotType()
    {
        return $this->hasOne(SpotType::class, ['id' => 'spot_type_id']);
    }

    public function getReservations()
    {
        return $this->hasMany(Reservation::class, ['spot_id' => 'id']);
    }
}
