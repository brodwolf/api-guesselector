import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class UserDto {
  @ApiProperty({
    description: 'ID of user',
    type: ObjectId,
    example: '6704b0621e6d1393cb06f923',
  })
  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Name of user',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of user',
    type: String,
    example: 'john@doe.com',
  })
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({
    description: 'Login of user',
    type: String,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'User created at', example: '2021-09-01', type: Date })
  @IsDate()
  created_at: Date;

  @Exclude()
  @ApiProperty({
    description: 'Password of user',
    type: String,
    example: 'strong_password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
