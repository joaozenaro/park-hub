<?php

use yii\db\Expression;
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

        // Insert open reservations
        $spot_ids = range(1, 100);
        shuffle($spot_ids);

        $reservas = [];
        for ($i = 0; $i < 50; $i++) {
            array_push($reservas, (object) [
                "license_plate" => $this->getRandomLicensePlate(),
                "spot_id" => $spot_ids[$i], // Get random spot
                "user_id" => 2,
                "price" => rand(10,20),
                "check_in" => new Expression('DATE_ADD(CURDATE(), INTERVAL FLOOR(RAND() * 86400) SECOND)'), // Random time today
            ]);
        }

        $this->batchInsert("reservation", [
            "license_plate",
            "spot_id",
            "user_id",
            "price",
            "check_in"
        ], $reservas);

        // Insert reservation history
        $reservas = [];
        for ($i = 0; $i < 150; $i++) {
            $checkIn = $this->getRandomDateTime();
            $checkOut = clone $checkIn;
            $checkOut->add(new DateInterval('PT' . rand(1, 24) . 'H' . rand(1, 59) . 'M')); // Random time between 1 hour and 24 hours

            $reservas[] = [
                "license_plate" => $this->getRandomLicensePlate(),
                "spot_id" => rand(1,100),
                "user_id" => 2,
                "price" => $this->calculatePrice($checkIn, $checkOut),
                "was_paid" => true,
                "check_in" => $checkIn->format('Y-m-d H:i:s'),
                "check_out" => $checkOut->format('Y-m-d H:i:s'),
            ];
        }

        $this->batchInsert("reservation", [
            "license_plate",
            "spot_id",
            "user_id",
            "price",
            "was_paid",
            "check_in",
            "check_out"
        ], $reservas);
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

    private function getRandomLicensePlate() {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomLicense = '';
        for ($i = 0; $i < 7; $i++) {
            $randomLicense .= $characters[random_int(0, strlen($characters) - 1)];
        }
        return $randomLicense;
    }

    private function getRandomDateTime() {
        $start = strtotime('2023-01-01');
        $end = strtotime('2024-01-01');
        $timestamp = mt_rand($start, $end);

        return (new DateTime())->setTimestamp($timestamp);
    }

    private function calculatePrice($checkIn, $checkOut) {
        $interval = $checkIn->diff($checkOut);
        $hours = $interval->h + ($interval->days * 24);
        $pricePerHour = 5;

        return $hours * $pricePerHour;
    }
}
