import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDurationToAppointment1617050020582 implements MigrationInterface {
    name = 'AddDurationToAppointment1617050020582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ADD "duration" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "duration"`);
    }

}
