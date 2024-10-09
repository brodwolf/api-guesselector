import { ImageDto } from '@infrastructure/controllers/image/dto/image.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, IsUrl, ValidateNested } from 'class-validator';
import { GameAuthorDto } from './game-author.dto';

export class CreateGameDto {
  //   @ApiProperty({
  //     description: 'Game external ID',
  //     type: String,
  //     example: '01J9Q68CA4S8DWTRVB72S8WEAZ',
  //   })
  //   @IsString()
  //   @IsNotEmpty()
  //   external_id: string;

  @ApiProperty({
    description: 'Game URL',
    type: String,
    example: 'insane-game.com',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Name of the game',
    type: String,
    example: 'Conexo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the game',
    type: String,
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IsPassportNumber.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Description of the game',
    type: String,
    isArray: true,
    example: '[ "game", "fun", "play" ]',
  })
  @IsArray()
  tags: string[];

  @ApiProperty({
    description: 'Author details',
    type: GameAuthorDto,
  })
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GameAuthorDto)
  author: GameAuthorDto;

  @ApiProperty({
    description: 'Game preview images',
    isArray: true,
    type: GameAuthorDto,
  })
  @IsArray()
  @IsDefined()
  @Type(() => ImageDto)
  @ValidateNested()
  images: ImageDto[];
}
