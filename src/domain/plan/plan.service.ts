import { Inject, Injectable } from '@nestjs/common';
import IPlan from './plan.entity';
import PlanRepository from '../../infra/repository/plan.repository';
import IRepository from 'src/shared/interface/repository.interface';
import { HealthPlan } from 'src/infra/schema/health.plan.schema';
import IService from 'src/shared/interface/service.interface';

@Injectable()
export default class PlanService implements IService<IPlan> {
  constructor(
    @Inject(PlanRepository)
    private readonly repository: IRepository<HealthPlan>,
  ) {}

  async create(data: IPlan): Promise<IPlan> {
    return await this.repository.create(data);
  }

  async list(): Promise<IPlan[]> {
    return await this.repository.findAll();
  }

  async listBy(condition: object): Promise<IPlan[]> {
    return await this.repository.findBy(condition);
  }

  async update(id: string, data: IPlan): Promise<IPlan> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<IPlan> {
    return await this.repository.remove(id);
  }
}
