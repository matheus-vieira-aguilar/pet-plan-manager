import { ApiProperty } from "@nestjs/swagger";

export default class IPlan {
  @ApiProperty({ description: 'Name of the plan' })
  name: string;

  @ApiProperty({ description: 'Description of the plan' })
  description: string;

  @ApiProperty({ description: 'Description of the coverage' })
  coverage: string;

  @ApiProperty({ description: 'Monthly price of the plan' })
  price: number;

  @ApiProperty({ description: 'Maximum number of visits allowed per year' })
  maxVisitsPerYear: number;

  @ApiProperty({ description: 'Maximum age of the animal to join the plan' })
  maxAge: number;

  @ApiProperty({
    description: 'Species of animals covered by the plan (e.g., dog, cat)',
    type: [String],
  })
  species: string[];
}
