import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiProperty({
    type: 'string',
    description: 'Comment text',
    required: true,
  })
  @IsNotEmpty()
  text: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    type: 'string',
    description: 'Comment text',
    required: true,
  })
  @IsNotEmpty()
  text: string;
}
