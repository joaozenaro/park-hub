<?php

namespace app\core\models\base;

use app\core\components\SaveModelTrait;
use Yii;
use yii\db\ActiveRecord;

class Reservation extends ActiveRecord
{
    use SaveModelTrait;

    const SCENARIO_DEFAULT = 'default';
    const SCENARIO_NO_SPOT = 'no_spot';

    public static function tableName()
    {
        return '{{reservation}}';
    }

    public function fields()
    {
        $fields = parent::fields();
        unset($fields['spot_id'], $fields['user_id']);

        $fields['user'] = function ($model) {
            return $model->user;
        };

        if ($this->scenario !== self::SCENARIO_NO_SPOT) {
            $fields['spot'] = function ($model) {
                return $model->spot;
            };
        }

        return $fields;
    }

    public function attributeLabels()
    {
        return [
            'license_plate' => Yii::t('app', 'Placa do veiculo'),
            'spot_id' => Yii::t('app', 'Id da vaga'),
            'price' => Yii::t('app', 'Valor'),
        ];
    }

    public function getSpot()
    {
        return $this->hasOne(Spot::class, ['id' => 'spot_id']);
    }

    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }
}
