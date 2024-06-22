<?php

use yii\db\Migration;

/**
 * Class m240622_191751_add_parking_spots_tables
 */
class m240622_191751_add_parking_spots_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('spot_type', [
            'id' => $this->primaryKey(),
            'name' => $this->string(60)->notNull()->unique(),
            'default_price' => $this->decimal()->notNull(),
        ]);

        $this->createTable('spot', [
            'id' => $this->primaryKey(),
            'code' => $this->string(20)->notNull()->unique(),
            'floor' => $this->string(20)->notNull(),
            'spot_type_id' => $this->integer()->notNull(),
        ]);

        // Add foreign key for table `spot_type`
        $this->addForeignKey(
            'fk-spot-spot_type_id',
            'spot',
            'spot_type_id',
            'spot_type',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey(
            'fk-spot-spot_type_id',
            'spot'
        );

        $this->dropTable('spot');
        $this->dropTable('spot_type');
    }
}
