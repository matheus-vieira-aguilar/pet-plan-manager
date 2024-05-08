import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Role } from 'src/domain/user/user.constants';
import * as bcrypt from 'bcrypt';
import IUser from 'src/domain/user/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document implements IUser {
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, set: (value: string) => bcrypt.hashSync(value, 10) })
  password: string;

  @Prop({ required: true })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
