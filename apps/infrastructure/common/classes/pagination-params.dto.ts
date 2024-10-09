import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 100',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Transform((value) => Number(value), { toClassOnly: true })
  limit = 100;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 0',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Transform((value) => Number(value), { toClassOnly: true })
  offset = 0;
}

export const getQueryDto = ({ limit, offset, ...rest }: { limit: number; offset: number; [key: string]: any }) => {
  return {
    skip: offset,
    take: limit,
    ...rest,
  };
};
