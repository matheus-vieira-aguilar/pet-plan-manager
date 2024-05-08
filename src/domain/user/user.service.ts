import { Inject, Injectable } from '@nestjs/common';
import IUser from './user.entity';
import UserRepository from '../../infra/repository/user.repository';
import { Role } from './user.constants';
import generator from 'generate-password-ts';
import IRepository from 'src/shared/interface/repository.interface';
import { User } from 'src/infra/schema/user.schema';
import IService from 'src/shared/interface/service.interface';

@Injectable()
export default class UserService implements IService<IUser> {
  constructor(
    @Inject(UserRepository) private readonly repository: IRepository<User>,
  ) {}

  async create(user: IUser): Promise<IUser> {
    if (user.roles.includes(Role.ADMINISTRATOR)) {
      const adminAlreadyExists = await this.repository.findOneBy({
        userType: Role.ADMINISTRATOR,
      });

      if (adminAlreadyExists) {
        throw new Error('Admin user already exists');
      }
    }

    if (!user.password) {
      user.password = this.generateRandomPassword();
    }

    const createdUser = await this.repository.create(user);

    return createdUser;
  }

  async list(): Promise<IUser[]> {
    return await this.repository.findAll();
  }

  async listBy(condition: object): Promise<IUser[]> {
    return await this.repository.findBy(condition);
  }

  async update(id: string, data: IUser): Promise<IUser> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<IUser> {
    return await this.repository.remove(id);
  }

  generateRandomPassword(): string {
    return generator.generate({
      length: 10,
      numbers: true,
    });
  }
}
