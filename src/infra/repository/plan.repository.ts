import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { HealthPlan } from '../schema/health.plan.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export default class PlanRepository extends BaseRepository<HealthPlan> {
  constructor(
    @InjectModel(HealthPlan.name) protected readonly model: Model<HealthPlan>,
  ) {
    super(model);
  }
}
