import { Inject, Injectable } from '@nestjs/common';
import PetRepository from '../../infra/repository/pet.repository';
import IPet from './pet.entity';
import { Pet } from '../../infra/schema/pet.schema';
import IRepository from 'src/shared/interface/repository.interface';
import IService from 'src/shared/interface/service.interface';

@Injectable()
export default class PetService implements IService<IPet> {
  constructor(
    @Inject(PetRepository) private readonly repository: IRepository<Pet>,
  ) {}

  async create(data: IPet): Promise<IPet> {
    return await this.repository.create(data);
  }

  async list(): Promise<IPet[]> {
    return await this.repository.findAll();
  }

  async listBy(condition: object): Promise<IPet[]> {
    return await this.repository.findBy(condition);
  }

  async update(id: string, data: IPet): Promise<IPet> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<IPet> {
    return await this.repository.remove(id);
  }
}
