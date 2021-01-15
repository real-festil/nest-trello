import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCardDto {
  @ApiProperty({
    type: 'string',
    description: 'Name',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Description',
    required: false,
  })
  description?: string;
}

export class UpdateCardDto {
  @ApiProperty({
    type: 'string',
    description: 'Name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'Description',
    required: false,
  })
  description?: string;
}
