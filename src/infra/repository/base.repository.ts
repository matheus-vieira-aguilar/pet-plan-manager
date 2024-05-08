import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IRepository from 'src/shared/interface/repository.interface';

@Injectable()
export abstract class BaseRepository<T> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async findOneBy(by: object): Promise<T> {
    return this.model.findOne(by).exec();
  }

  async findBy(by: object): Promise<T[]> {
    return this.model.find(by).exec();
  }

  async create(dto: any): Promise<T> {
    const created = new this.model(dto);
    return (await created.save()) as unknown as T;
  }

  async update(id: string, updateUserDto: any): Promise<T> {
    return this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
