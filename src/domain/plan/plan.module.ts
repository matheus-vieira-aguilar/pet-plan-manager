import { Module } from '@nestjs/common';
import PlanService from './plan.service';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  exports: [PlanService],
  providers: [PlanService],
})
export class PlanModule {}
