<?php

namespace app\core\models;

use yii\db\ActiveRecord;

class Spot extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%spot}}';
    }
}