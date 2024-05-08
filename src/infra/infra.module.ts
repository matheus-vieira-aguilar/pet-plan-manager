import { Module } from '@nestjs/common';
import UserRepository from './repository/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthPlan, HealthPlanSchema } from './schema/health.plan.schema';
import PlanRepository from './repository/plan.repository';
import { Pet, PetSchema } from './schema/pet.schema';
import PetRepository from './repository/pet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    MongooseModule.forFeature([
      { name: HealthPlan.name, schema: HealthPlanSchema },
    ]),
  ],
  providers: [UserRepository, PlanRepository, PetRepository],
  exports: [UserRepository, PlanRepository, PetRepository],
})
export class InfraModule {}
