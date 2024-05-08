import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export default class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) protected readonly model: Model<User>) {
    super(model);
  }
}
