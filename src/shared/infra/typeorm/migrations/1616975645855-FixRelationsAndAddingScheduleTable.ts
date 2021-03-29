import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRelationsAndAddingScheduleTable1616975645855 implements MigrationInterface {
    name = 'FixRelationsAndAddingScheduleTable1616975645855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_66dee3bea82328659a4db8e54b7"`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "user_id" TO "schedule_id"`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_55e6651198104efea0b04568a8" UNIQUE ("user_id"), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "schedule_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_8a72e9473a2cdb593d1dc7f029e" UNIQUE ("schedule_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8a72e9473a2cdb593d1dc7f029e" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_55e6651198104efea0b04568a88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f23ae7d198a3695c3a518d9737e" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f23ae7d198a3695c3a518d9737e"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_55e6651198104efea0b04568a88"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8a72e9473a2cdb593d1dc7f029e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_8a72e9473a2cdb593d1dc7f029e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "schedule_id"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "schedule_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_66dee3bea82328659a4db8e54b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
