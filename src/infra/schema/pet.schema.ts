import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HealthPlan } from './health.plan.schema';
import IPet from 'src/domain/pet/pet.entity';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Pet extends Document implements IPet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  species: string;

  @Prop({ required: true })
  breed: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  user: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthPlan',
  })
  plan: HealthPlan; // Referência ao plano de pet associado

  @Prop({ required: true })
  age: number;

  @Prop()
  photoUrl: string; // URL da foto do pet

  @Prop()
  description: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
