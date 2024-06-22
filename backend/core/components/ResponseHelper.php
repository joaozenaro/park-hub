<?php

namespace app\core\components;

use Throwable;
use Yii;
use yii\web\HttpException;
use yii\web\Response;

class ResponseHelper
{
    public static function Unauthorized(): Throwable
    {
        throw new HttpException(401, "Sua requisição foi feita com credenciais invalidas.");
    }

    public static function BadRequest(string $message, array $data = null)
    {
        Yii::$app->response->statusCode = 400;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if (!isset($data)) {
            return [
                "message" => $message
            ];
        }

        return [
            "message" => $message,
            "data" => $data
        ];
    }

    public static function UnprocessableEntity(string $message, array $data = null)
    {
        Yii::$app->response->statusCode = 422;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if (!isset($data)) {
            return [
                "message" => $message
            ];
        }

        return [
            "message" => $message,
            "data" => $data
        ];
    }

    public static function NotFound(string $message)
    {
        Yii::$app->response->statusCode = 404;
        Yii::$app->response->format = Response::FORMAT_JSON;
        return [
            "message" => $message
        ];
    }

    public static function Success(string $message)
    {
        Yii::$app->response->statusCode = 200;
        Yii::$app->response->format = Response::FORMAT_JSON;
        return [
            "message" => $message
        ];
    }

    public static function Created(string $message)
    {
        Yii::$app->response->statusCode = 201;
        Yii::$app->response->format = Response::FORMAT_JSON;
        return [
            "message" => $message
        ];
    }
}
