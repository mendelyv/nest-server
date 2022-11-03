import { applyDecorators, Type } from '@nestjs/common';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export const FindAndCountAllProperty = <T extends Type<unknown>>(dto: T) => applyDecorators(
    ApiProperty({
        properties: {
            count: {
                type: 'number',
            },
            rows: {
                type: 'array',
                items: { allOf: [{ $ref: getSchemaPath(dto) }] }
            }
        }
    })
)
