import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ImageDto {
  @ApiProperty({
    description: 'File Name',
    type: String,
    example: 'asset_01.png',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Image URL',
    type: String,
    example: 'john-doe.com/asset_01.png',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
