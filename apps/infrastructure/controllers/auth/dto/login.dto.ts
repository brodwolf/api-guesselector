import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Login of user',
    type: String,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Password of user',
    type: String,
    example: 'strong_password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
