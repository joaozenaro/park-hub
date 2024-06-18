<?php

namespace app\models\user;

use app\models\user;
use Yii;
use yii\db\ActiveRecord;

abstract class AbstractUser extends ActiveRecord implements \yii\web\IdentityInterface
{
    use UserRoleManager;

    // Constants
    const ROLE_USER = 10;
    const ROLE_STAFF = 50;
    const ROLE_ADMIN = 99;
    const STATUS_DELETED = -1;
    const STATUS_DISABLED = 0;
    const STATUS_PENDING = 1;
    const STATUS_ACTIVE = 10;

    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'string', 'length' => [3, 15]],
            [
                'username',
                'match',
                'pattern' => '/^[A-Za-z0-9_-]{3,15}$/',
                'message' => Yii::t(
                    'app',
                    'Your username can only contain alphanumeric characters, underscores and dashes.'
                ),
            ],
            ['username', 'validateUsername'],
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'validateEmail'],
            ['password', 'string', 'min' => 6],
            ['password', 'validatePasswordSubmit'],
            [['confirmed_at', 'blocked_at', 'last_login_at'], 'datetime', 'format' => 'php:U'],
            [['last_login_ip', 'registration_ip'], 'ip'],
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_PENDING, self::STATUS_DISABLED]],
            ['role', 'default', 'value' => self::ROLE_USER],
            ['role', 'in', 'range' => [self::ROLE_USER, self::ROLE_STAFF, self::ROLE_ADMIN]],
            ['permissions', 'validatePermissions'],
            [['access_token', 'permissions'], 'safe'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'username' => Yii::t('app', 'Username'),
            'email' => Yii::t('app', 'Email'),
            'registration_ip' => Yii::t('app', 'Registration ip'),
            'unconfirmed_email' => Yii::t('app', 'New email'),
            'password' => Yii::t('app', 'Password'),
            'created_at' => Yii::t('app', 'Registration time'),
            'confirmed_at' => Yii::t('app', 'Confirmation time'),
        ];
    }

    public function beforeSave($insert)
    {
        $this->username = strtolower($this->username);
        $this->unconfirmed_email = $this->unconfirmed_email ?: $this->email;
        $this->registration_ip = $this->registration_ip ?: Yii::$app->request->userIP;
        $this->auth_key = $this->auth_key ?: Yii::$app->security->generateRandomString();

        return parent::beforeSave($insert);
    }

    public function afterSave($insert, $changedAttributes)
    {
        $authManager = Yii::$app->authManager;
        $userId = $this->getId();
        $roleName = $this->getRoleName();

        if ($insert) {
            $this->assignRole($authManager, $roleName, $userId);
        } elseif (isset($changedAttributes['role'])) {
            $this->updateRole($authManager, $roleName, $userId);
        }

        if (!empty($this->permissions)) {
            $this->updatePermissions($authManager, $userId);
        }

        return parent::afterSave($insert, $changedAttributes);
    }

    public function fields()
    {
        $fields = [
            'id',
            'username',
            'email',
            'unconfirmed_email',
            'role',
            'role_label' => function () {
                return $this->getRoleLabel();
            },
            'last_login_at',
            'last_login_ip',
            'confirmed_at',
            'blocked_at',
            'status',
            'status_label' => function () {
                $statusLabel = '';
                switch ($this->status) {
                    case self::STATUS_ACTIVE:
                        $statusLabel = Yii::t('app', 'Active');
                        break;
                    case self::STATUS_PENDING:
                        $statusLabel = Yii::t('app', 'Waiting Confirmation');
                        break;
                    case self::STATUS_DISABLED:
                        $statusLabel = Yii::t('app', 'Disabled');
                        break;
                    case self::STATUS_DELETED:
                        $statusLabel = Yii::t('app', 'Deleted');
                        break;
                }
                return $statusLabel;
            },
            'created_at',
            'updated_at',
        ];

        if ($this->role == self::ROLE_STAFF || $this->role == self::ROLE_ADMIN) {
            $fields['permissions'] = function () {
                $authManager = Yii::$app->authManager;

                /** @var Permission[] $availablePermissions */
                $availablePermissions = $authManager->getPermissions();

                /** @var array $tmpPermissions to store permissions assigned to the staff */
                $tmpPermissions = [];

                /** @var Permission[] $userPermissions */
                $userPermissions = $authManager->getPermissionsByUser($this->getId());

                if (!empty($availablePermissions)) {
                    /**
                     * @var string $permissionKey
                     * @var Permission $permission
                     */
                    foreach ($availablePermissions as $permissionKey => $permission) {
                        $tmpPermission = [
                            'name' => $permission->name,
                            'description' => $permission->description,
                            'checked' => false,
                        ];

                        if (!empty($userPermissions)) {
                            foreach ($userPermissions as $userPermissionKey => $userPermission) {
                                if ($userPermission->name == $permission->name) {
                                    $tmpPermission['checked'] = true;
                                    break;
                                }
                            }
                        }

                        $tmpPermissions[] = $tmpPermission;
                    }
                }

                return $tmpPermissions;
            };
        }

        return $fields;
    }

    public function getIsBlocked(): bool
    {
        return $this->blocked_at != null;
    }

    public function getIsConfirmed(): bool
    {
        return $this->confirmed_at != null;
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password): bool
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function validatePasswordSubmit($attribute, $params)
    {
        $request = Yii::$app->request;

        if ($request->isPost) {
            if ($this->$attribute == '') {
                $this->addError($attribute, Yii::t('app', 'The password is required.'));
            }
        }
    }

    public function validatePermissions($attribute, $params)
    {
        if (!empty($this->$attribute)) {
            $authManager = Yii::$app->authManager;

            $existingPermissions = $authManager->getPermissions();

            foreach ($this->$attribute as $permissionKey => $permission) {

                if (
                    array_key_exists('name', $permission) === false ||
                    array_key_exists('description', $permission) === false ||
                    array_key_exists('checked', $permission) === false
                ) {
                    $this->addError($attribute, Yii::t('app', 'The permission is not valid format.'));
                } elseif (isset($existingPermissions[$permission['name']]) == false) {
                    $this->addError(
                        $attribute,
                        Yii::t(
                            'app',
                            'The permission name \'' . $permission['name'] . '\' is not valid.'
                        )
                    );
                } elseif (is_bool($permission['checked']) === false) {
                    $this->addError(
                        $attribute,
                        Yii::t(
                            'app',
                            'The permission checked \'' . $permission['checked'] . '\' is not valid.'
                        )
                    );
                }
            }
        }
    }

    public function validateUsername($attribute, $params)
    {
        $request = Yii::$app->request;

        if ($request->isPost) { // Add
            $existingUser = User::find()
                ->where(['username' => $this->$attribute])
                ->count();

            if ($existingUser > 0) {
                $this->addError($attribute, Yii::t('app', 'The username has already been taken.'));
            }
        } elseif ($request->isPut) { // Update
            $user = User::findIdentityWithoutValidation($this->id);

            if ($user == null) {
                $this->addError($attribute, Yii::t('app', 'The system cannot find requested user.'));
            } else {
                $existingUser = User::find()
                    ->where(['=', 'username', $this->$attribute])
                    ->andWhere(['!=', 'id', $this->id])
                    ->count();

                if ($existingUser > 0) {
                    $this->addError($attribute, Yii::t('app', 'The username has already been taken.'));
                }
            }
        } else {
            $this->addError($attribute, Yii::t('app', 'Unknown request'));
        }
    }

    public function validateEmail($attribute, $params)
    {
        $request = Yii::$app->request;

        if ($request->isPost) { // Add
            $existingUser = User::find()
                ->where(['email' => $this->$attribute])
                ->count();

            if ($existingUser > 0) {
                $this->addError($attribute, Yii::t('app', 'The email has already been taken.'));
            }
        } elseif ($request->isPut) { // Update
            $user = User::findIdentityWithoutValidation($this->id);

            if ($user == null) {
                $this->addError($attribute, Yii::t('app', 'The system cannot find requested user.'));
            } else {
                $existingUser = User::find()
                    ->where(['=', 'email', $this->$attribute])
                    ->andWhere(['!=', 'id', $this->id])
                    ->count();

                if ($existingUser > 0) {
                    $this->addError($attribute, Yii::t('app', 'The email has already been taken.'));
                }
            }
        } else {
            $this->addError($attribute, Yii::t('app', 'Unknown request'));
        }
    }

    private function getRoleName()
    {
        $roleName = '';
        switch ($this->role) {
            case self::ROLE_USER:
                $roleName = 'user';
                break;
            case self::ROLE_STAFF:
                $roleName = 'staff';
                break;
            case self::ROLE_ADMIN:
                $roleName = 'admin';
                break;
        }
        return $roleName;
    }
}
