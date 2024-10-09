import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
    example: 'john@doe.com',
  })
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({
    description: 'Login of the user',
    type: String,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    example: 'strong_password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
