import { HttpStatus } from '@nestjs/common';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class PagedResponseDto<T> {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Total enties in the fetched query',
    type: 'number',
    example: 1,
  })
  total: number;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @ApiProperty({
    description: 'Array of elements retrived',
    type: 'array',
    isArray: true,
  })
  data: T[];

  constructor(pagedResponseDto: Partial<PagedResponseDto<T>>) {
    Object.assign(this, pagedResponseDto);
  }
}

export const PagedResponseSwaggerDecorator = (dto: any) => {
  return {
    schema: {
      allOf: [
        { $ref: getSchemaPath(PagedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(dto) },
            },
            total: {
              type: 'number',
            },
          },
        },
      ],
    },
    status: HttpStatus.OK,
  };
};
