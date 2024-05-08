import { ApiProperty } from '@nestjs/swagger';
import { Role } from './user.constants';

export default class IUser {
  _id: string;

  @ApiProperty({
    example: 'john_donne',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'sample!!passw0rd',
    required: true,
  })
  password: string;

  @ApiProperty({ required: true,  enum: [Role.ADMINISTRATOR, Role.CLIENT]})
  roles: Role[];
}
