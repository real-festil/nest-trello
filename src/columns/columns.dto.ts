import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddColumnDto {
  @ApiProperty({
    type: 'string',
    description: 'Name',
    required: true,
  })
  @IsNotEmpty()
  name: string;
}

export class UpdateColumnDto {
  @ApiProperty({
    type: 'string',
    description: 'Name',
    required: true,
  })
  @IsNotEmpty()
  name: string;
}
