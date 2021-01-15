import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({
    type: 'string',
    description: 'username',
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    type: 'string',
    description: 'Password',
    required: true,
  })
  password: string;
}
