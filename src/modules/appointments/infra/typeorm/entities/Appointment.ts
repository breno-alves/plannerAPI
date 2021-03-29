import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'schedule_id' })
  scheduleId: string;

  @Column()
  name: string;

  @Column({ name: 'week_day' })
  weekDay: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Schedule, schedule => schedule.appointments)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;
}

export default Appointment;
