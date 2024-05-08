import { InjectModel } from '@nestjs/mongoose';
import { Pet } from '../schema/pet.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export default class PetRepository extends BaseRepository<Pet> {
  constructor(@InjectModel(Pet.name) protected readonly model: Model<Pet>) {
    super(model);
  }
}
