<?php

namespace app\core\models\form;

use app\core\components\SaveModelTrait;
use app\core\models\base\Spot;
use app\core\models\base\User;
use yii\base\Model;

class CheckinForm extends Model
{
    use SaveModelTrait;

    public $license_plate;
    public $spot_id;
    public $user_id;
    
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
        ];
    }
}