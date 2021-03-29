import {MigrationInterface, QueryRunner} from "typeorm";

export class FixingModels1616978117031 implements MigrationInterface {
    name = 'FixingModels1616978117031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "week_day"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "week_day" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "week_day"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "week_day" character varying NOT NULL`);
    }

}
