<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use yii\db\ActiveRecord;

class SpotType extends ActiveRecord
{
    use SaveModelTrait;

    public static function tableName()
    {
        return '{{spot_type}}';
    }

    public function rules()
    {
        return [
            [['name', 'default_price'], 'required'],
            [['name'], 'string', 'max' => 60],
            [['default_price'], 'double'],
        ];
    }
}