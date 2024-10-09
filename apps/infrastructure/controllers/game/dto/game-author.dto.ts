import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class GameAuthorDto {
  @ApiProperty({
    description: 'Name of Author',
    type: String,
    example: 'Daydash',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Author URL',
    type: String,
    example: 'john-doe.com',
  })
  @IsUrl()
  @IsOptional()
  url: string;
}
