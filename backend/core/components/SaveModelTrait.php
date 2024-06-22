<?php

namespace app\core\components;

use yii\db\Exception;

trait SaveModelTrait
{
    /**
     * Saves the model and handle errors.
     */
    public function saveModel(\yii\db\ActiveRecord $model): bool
    {
        try {
            if (!$model->save()) {
                throw new Exception(json_encode($model->firstErrors));
            }
        } catch (Exception $e) {
            throw new Exception('Model save failed: ' . $e->getMessage(), 0, $e);
        }

        return true;
    }
}
