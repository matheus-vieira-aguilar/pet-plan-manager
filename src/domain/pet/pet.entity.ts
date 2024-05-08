import { ApiProperty } from '@nestjs/swagger';
import IPlan from 'src/domain/plan/plan.entity';
import IUser from 'src/domain/user/user.entity';

export default class IPet {
  @ApiProperty({
    required: true,
    example: 'Toby',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'Dog',
  })
  species: string;

  @ApiProperty({
    required: true,
    example: 'Golden Retriever',
  })
  breed: string;

  @ApiProperty({
    required: true,
    example: '663a92098ad9c6544267fcaf',
  })
  user: IUser;

  @ApiProperty({
    required: true,
    example: '55567Aad9c6544267fcaf',
  })
  plan: IPlan;

  @ApiProperty({
    required: true,
    example: 12,
  })
  age: number;

  @ApiProperty({
    required: true,
    example: 'https://www.photo.com',
  })
  photoUrl: string;

  @ApiProperty({
    required: true,
    example: 'Here`s a real cute dog',
  })
  description: string;
}
