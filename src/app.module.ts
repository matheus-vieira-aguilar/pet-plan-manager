import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infra/schema/user.schema';
import { UserController } from './application/controller/users.controller';
import UserRepository from './infra/repository/user.repository';
import { UserModule } from './domain/user/user.module';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './auth/auth.module';
import PlanController from './application/controller/plan.controller';
import { PlanModule } from './domain/plan/plan.module';
import PetController from './application/controller/pet.controller';
import { PetModule } from './domain/pet/pet.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/pet-plan-db'),
    InfraModule,
    AuthModule,
    UserModule,
    PlanModule,
    PetModule,
  ],
  controllers: [UserController, PlanController, PetController],
})
export class AppModule {}
