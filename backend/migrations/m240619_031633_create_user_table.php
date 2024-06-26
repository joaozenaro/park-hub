<?php

use app\core\types\UserStatus;
use yii\db\Expression;
use yii\db\Migration;

/**
 * Handles the creation of table `user`.
 */
class m240619_031633_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'username' => $this->string(60)->defaultValue(null)->unique(),
            'name' => $this->string(150)->defaultValue(null),
            'avatar' => $this->text()->defaultValue(null),
            'email' => $this->string(120)->notNull()->unique(),
            'auth_key' => $this->string()->notNull(),
            'password_hash' => $this->string()->notNull(),
            'password_reset_token' => $this->string()->defaultValue(''),
            'status' => $this->tinyInteger()->defaultValue(0),
            'created_at' => $this->timestamp()->defaultValue(null),
            'updated_at' => $this->timestamp()->defaultValue(null),
        ]);

        $timestampNow = new Expression('NOW()');

        $this->batchInsert('user', [
                'id',
                'username',
                'email',
                'auth_key',
                'password_hash',
                'password_reset_token',
                'status',
                'created_at',
                'updated_at',
            ], 
            [
                [
                    1,
                    'admin',
                    'admin@admin.com',
                    Yii::$app->security->generateRandomString(),
                    Yii::$app->security->generatePasswordHash('test123'),
                    Yii::$app->security->generateRandomString(),
                    UserStatus::ACTIVE,
                    $timestampNow,
                    $timestampNow,
                ],
                [
                    2,
                    'user',
                    'user@user.com',
                    Yii::$app->security->generateRandomString(),
                    Yii::$app->security->generatePasswordHash('test123'),
                    Yii::$app->security->generateRandomString(),
                    UserStatus::ACTIVE,
                    $timestampNow,
                    $timestampNow,
                ],
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user');
    }
}