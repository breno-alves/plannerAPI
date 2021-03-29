import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.schedulesRepository = schedulesRepository;
  }

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email adress already taken');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const schedule = await this.schedulesRepository.create({ userId: user.id });
    user.scheduleId = schedule.id;
    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
