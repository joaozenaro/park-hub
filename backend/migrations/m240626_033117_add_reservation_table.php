<?php

use yii\db\Migration;

/**
 * Class m240626_033117_add_reservation_table
 */
class m240626_033117_add_reservation_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable("reservation", [
            "id" => $this->primaryKey(),
            "license_plate" => $this->string(7)->notNull(),
            "spot_id" => $this->integer()->notNull(),
            "user_id" => $this->integer()->notNull(),
            "price" => $this->decimal(10,2)->notNull(),
            "was_paid" => $this->boolean()->defaultValue(false),
            "check_in" => $this->timestamp()->notNull(),
            "check_out" => $this->timestamp()->defaultValue(null),
        ]);

        // Add foreign key for table `spot`
        $this->addForeignKey(
            "fk-reservation-spot_id",
            "reservation",
            "spot_id",
            "spot",
            "id",
            "CASCADE"
        );

        // Add foreign key for table `user`
        $this->addForeignKey(
            "fk-reservation-user_id",
            "reservation",
            "user_id",
            "user",
            "id",
            "CASCADE"
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey(
            "fk-reservation-spot_id",
            "reservation"
        );
        
        $this->dropForeignKey(
            "fk-reservation-user_id",
            "reservation"
        );

        $this->dropTable("reservation");
    }
}
