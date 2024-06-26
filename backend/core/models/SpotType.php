<?php

namespace app\core\models;

use app\core\components\SaveModelTrait;
use Yii;
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
            ['name', 'unique', 'targetClass' => SpotType::class],
            [['default_price'], 'number'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'name' => Yii::t('app', 'Nome'),
            'default_price' => Yii::t('app', 'Valor padrão'),
        ];
    }

    public function getSpotType()
    {
        return $this->hasOne(SpotType::class, ['id' => 'spot_type_id']);
    }
}
