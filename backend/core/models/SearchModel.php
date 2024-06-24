<?php

namespace app\core\models;

use Yii;
use yii\base\Model;

class SearchModel extends Model
{
    public $searchTerm;
    public $skip;
    public $take;
    public $startDate;
    public $endDate;

    public function rules()
    {
        return [
            ['searchTerm', 'string'],
            [['skip', 'take'], 'integer'],
            [['startDate', 'endDate'], 'datetime', 'format' => 'php:Y-m-d'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'searchTerm' => Yii::t('app', 'Termo de busca'),
            'startDate' => Yii::t('app', 'Data inicial'),
            'endDate' => Yii::t('app', 'Data final'),
        ];
    }
}
