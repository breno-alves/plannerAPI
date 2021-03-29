import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findById(id: string): Promise<Appointment | undefined>;
  save(appointment: Appointment): Promise<Appointment>;
}
