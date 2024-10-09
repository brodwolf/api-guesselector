import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty, IsString } from 'class-validator';

export class CreateFingerPrintDto {
  @ApiProperty({
    description: 'External ID',
    type: String,
    example: '01J9Q68CA4S8DWTRVB72T8WEFZ',
  })
  @IsString()
  @IsNotEmpty()
  external_id: string;

  @ApiProperty({
    description: 'Fingerprint IP',
    type: String,
    example: '172.217.22.14',
  })
  @IsIP()
  @IsNotEmpty()
  ip: string;

  constructor(createFingerPrintDto: Partial<CreateFingerPrintDto>) {
    Object.assign(this, createFingerPrintDto);
  }
}
