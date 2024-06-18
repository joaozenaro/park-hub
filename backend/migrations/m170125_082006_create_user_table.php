<?php

use yii\db\Migration;

class m170125_082006_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable(
            'user',
            [
                'id' => $this->primaryKey(),
                'username' => $this->string(200),
                'auth_key' => $this->string(255),
                'access_token_expired_at' => $this->integer(11) . ' NULL DEFAULT NULL',
                'password_hash' => $this->string(255),
                'password_reset_token' => $this->string(255),
                'email' => $this->string(255),
                'unconfirmed_email' => $this->string(255),
                'confirmed_at' => $this->integer(11) . ' NULL DEFAULT NULL',
                'registration_ip' => $this->string(20),
                'last_login_at' => $this->integer(11) . ' NULL DEFAULT NULL',
                'last_login_ip' => $this->string(20),
                'blocked_at' => $this->integer(11) . ' NULL DEFAULT NULL',
                'status' => $this->integer(2)->defaultValue(10),
                'role' => $this->integer(11)->null(),
                'created_at' => $this->integer(11) . ' NULL DEFAULT NULL',
                'updated_at' => $this->integer(11) . ' NULL DEFAULT NULL'
            ]
        );

        $this->createIndex(
            'idx-user',
            'user',
            ['username', 'auth_key', 'password_hash', 'status']
        );

        $this->batchInsert(
            'user',
            [
                'id',
                'username',
                'auth_key',
                'access_token_expired_at',
                'password_hash',
                'password_reset_token',
                'email',
                'unconfirmed_email',
                'confirmed_at',
                'registration_ip',
                'last_login_at',
                'last_login_ip',
                'blocked_at',
                'status',
                'role',
                'created_at',
                'updated_at'
            ],
            [
                [
                    1,
                    'admin',
                    Yii::$app->security->generateRandomString(),
                    time(),
                    Yii::$app->security->generatePasswordHash("test123"),
                    null,
                    'admin@demo.com',
                    'admin@demo.com',
                    time(),
                    '127.0.0.1',
                    time(),
                    '127.0.0.1',
                    null,
                    10,
                    99,
                    time(),
                    time()
                ],
                [
                    2,
                    'user',
                    Yii::$app->security->generateRandomString(),
                    time(),
                    Yii::$app->security->generatePasswordHash("test123"),
                    null,
                    'user@demo.com',
                    'user@demo.com',
                    time(),
                    '127.0.0.1',
                    time(),
                    '127.0.0.1',
                    null,
                    10,
                    10,
                    time(),
                    time(),
                ]
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('idx-user', 'user');

        $this->dropTable('user');
    }
}
