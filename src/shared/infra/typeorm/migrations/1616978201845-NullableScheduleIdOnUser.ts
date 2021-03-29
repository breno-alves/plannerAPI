import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableScheduleIdOnUser1616978201845 implements MigrationInterface {
    name = 'NullableScheduleIdOnUser1616978201845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8a72e9473a2cdb593d1dc7f029e"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "schedule_id" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."schedule_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8a72e9473a2cdb593d1dc7f029e" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8a72e9473a2cdb593d1dc7f029e"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."schedule_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "schedule_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8a72e9473a2cdb593d1dc7f029e" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
