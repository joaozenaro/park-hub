<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class SiteController extends Controller
{
    public function actionPing()
    {
        $response = new Response();
        $response->format = yii\web\Response::FORMAT_JSON;
        $response->statusCode = 200;
        $response->data = Yii::t('app', 'pong');

        return $response;
    }

    public function actionError()
    {
        $exception = \Yii::$app->errorHandler->exception;
        return $this->asJson([
            'name' => 'Error Action',
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
            'status' => $exception->statusCode,
            'type' => get_class($exception),
        ]);
    }
}
