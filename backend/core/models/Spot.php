<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use yii\db\ActiveRecord;

class Spot extends ActiveRecord
{
    use SaveModelTrait;

    public $spot_type_name;

    public static function tableName()
    {
        return '{{%spot}}';
    }

    public function rules()
    {
        return [
            [['code', 'floor', 'spot_type_name'], 'trim'],
            [['code', 'floor', 'spot_type_name'], 'required'],
            [['code', 'floor', 'spot_type_name'], 'string', 'max' => 20],
            [['code', 'floor'], 'filter', 'filter' => 'strtoupper'],
            ['code', 'unique', 'targetClass' => Spot::class],
            [['spot_type_name'], 'exist', 'targetClass' => SpotType::class, 'targetAttribute' => 'name'],
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
}
