import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import PetService from './pet.service';

@Module({
  imports: [InfraModule],
  exports: [PetService],
  providers: [PetService],
})
export class PetModule {}
