import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointmentsRepository: Repository<Appointment>;

  constructor() {
    this.appointmentsRepository = getRepository(Appointment);
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    return this.appointmentsRepository.findOne(id);
  }

  public async findAll(scheduleId: string): Promise<Appointment[] | []> {
    return this.appointmentsRepository.find({
      where: {
        scheduleId,
      },
    });
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(data);
    await this.appointmentsRepository.save(appointment);
    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.appointmentsRepository.save(appointment);
  }

  public async delete(appointmentId: string): Promise<void> {
    await this.appointmentsRepository.delete(appointmentId);
  }
}

export default AppointmentsRepository;
