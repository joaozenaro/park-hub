<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\{BadRequestHttpException, HttpException, NotFoundHttpException, ServerErrorHttpException};
use app\models\{
    User,
    UserEditForm,
    UserSearch,
    SignupForm,
    LoginForm,
    SignupConfirmForm,
    PasswordResetForm,
    PasswordResetRequestForm,
    PasswordResetTokenVerificationForm
};

class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);
    }

    public function actions()
    {
        return [];
    }

    private function respondWithValidationError($errors)
    {
        throw new HttpException(422, json_encode($errors));
    }

    private function findUserModel($id)
    {
        $user = User::find()->where(['id' => $id])
            ->andWhere(['!=', 'status', User::STATUS_DELETED])
            ->andWhere(['role' => User::ROLE_USER])
            ->one();

        if ($user === null) {
            throw new NotFoundHttpException("Object not found: $id");
        }

        return $user;
    }

    public function actionIndex()
    {
        $search = new UserSearch();
        $search->load(Yii::$app->request->get());
        $search->in_roles = [User::ROLE_USER];
        $search->not_in_status = [User::STATUS_DELETED];

        if (!$search->validate()) {
            throw new BadRequestHttpException('Invalid parameters: ' . json_encode($search->getErrors()));
        }

        return $search->getDataProvider();
    }

    public function actionCreate()
    {
        $model = new User();
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');

        if (!$model->validate()) {
            $this->respondWithValidationError($model->errors);
        }

        if ($model->save()) {
            Yii::$app->getResponse()->setStatusCode(201);
            $id = implode(',', array_values($model->getPrimaryKey(true)));
            Yii::$app->getResponse()->getHeaders()->set('Location', Url::toRoute([$id], true));
        }

        return $model;
    }

    public function actionUpdate($id)
    {
        $model = $this->findUserModel($id);
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            Yii::$app->getResponse()->setStatusCode(200);
        } else {
            $this->respondWithValidationError($model->errors);
        }

        return $model;
    }

    public function actionView($id)
    {
        $temp = $this->findUserModel($id);
        return $this->asJson($temp);
    }

    public function actionDelete($id)
    {
        $model = $this->findUserModel($id);
        $model->status = User::STATUS_DELETED;

        if (!$model->save(false)) {
            throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
        }

        Yii::$app->getResponse()->setStatusCode(204);
        return 'ok';
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        $model->roles = [User::ROLE_USER];
        $model->load(Yii::$app->request->post());

        if ($model->login()) {
            $user = $model->getUser();
            $user->generateAccessTokenAfterUpdatingClientInfo(true);

            Yii::$app->getResponse()->setStatusCode(200);
            $id = implode(',', array_values($user->getPrimaryKey(true)));

            return [
                'id' => (int)$id,
                'access_token' => $user->access_token,
            ];
        } else {
            $this->respondWithValidationError($model->errors);
        }
    }

    public function actionSignup()
    {
        $model = new SignupForm();
        $model->load(Yii::$app->request->post());

        if ($model->validate() && $model->signup()) {
            $model->sendConfirmationEmail();

            Yii::$app->getResponse()->setStatusCode(201);
            return 'true';
        } else {
            $this->respondWithValidationError($model->errors);
        }
    }

    public function actionValidateToken()
    {
        $authHeader = Yii::$app->request->getHeaders()->get('Authorization');

        if (isset($authHeader) && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
            $userIdentity = User::findIdentityByAccessToken($matches[1]);

            if ($userIdentity === null) {
                Yii::$app->getResponse()->setStatusCode(401);
                return $this->asJson(['message' => 'Unauthorized']);
            }

            Yii::$app->getResponse()->setStatusCode(200);
            return $this->asJson(['message' => 'Success']);
        }

        throw new BadRequestHttpException('Authorization header is missing or malformed.');
    }

    public function actionConfirm()
    {
        $model = new SignupConfirmForm();

        $model->id = Yii::$app->getRequest()->getQueryParam('id');
        $model->auth_key = Yii::$app->getRequest()->getQueryParam('auth_key');

        if ($model->validate() && $model->confirm()) {
            Yii::$app->getResponse()->setStatusCode(200);
            return $this->redirect(['/confirm?status=confirmado']);
        }

        return $this->redirect(['/confirm']);
    }

    public function actionPasswordResetRequest()
    {
        $model = new PasswordResetRequestForm();
        $model->load(Yii::$app->request->post());

        if ($model->validate() && $model->sendPasswordResetEmail()) {
            Yii::$app->getResponse()->setStatusCode(200);
            return 'true';
        } else {
            $this->respondWithValidationError($model->errors);
        }
    }

    public function actionPasswordResetTokenVerification()
    {
        $model = new PasswordResetTokenVerificationForm();
        $model->load(Yii::$app->request->post());

        if ($model->validate()) {
            Yii::$app->getResponse()->setStatusCode(200);
            return 'true';
        } else {
            $this->respondWithValidationError($model->errors);
        }
    }

    public function actionPasswordReset()
    {
        $model = new PasswordResetForm();
        $model->load(Yii::$app->request->post());

        if ($model->validate() && $model->resetPassword()) {
            Yii::$app->getResponse()->setStatusCode(200);
            return 'true';
        } else {
            $this->respondWithValidationError($model->errors);
        }
    }

    public function actionMe()
    {
        $user = User::findIdentity(Yii::$app->user->getId());

        if ($user !== null) {
            Yii::$app->getResponse()->setStatusCode(200);
            return [
                'username' => $user->username,
                'email' => $user->email,
                'last_login_at' => $user->last_login_at,
                'last_login_ip' => $user->last_login_ip,
            ];
        } else {
            throw new NotFoundHttpException('Object not found');
        }
    }

    public function actionMeUpdate()
    {
        $user = User::findIdentity(Yii::$app->user->getId());

        if ($user !== null) {
            $model = new UserEditForm();
            $model->load(Yii::$app->request->post());
            $model->id = $user->id;

            if ($model->validate() && $model->save()) {
                Yii::$app->getResponse()->setStatusCode(200);
                return 'true';
            } else {
                $this->respondWithValidationError($model->errors);
            }
        } else {
            throw new NotFoundHttpException('Object not found');
        }
    }
}
