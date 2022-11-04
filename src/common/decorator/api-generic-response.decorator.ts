import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiGenericResponse = <T extends Type<unknown>>(dto: T) => applyDecorators(
    ApiResponse({
        schema: {
            allOf: [
                { properties: { status: { type: 'number' } } },
                { properties: { message: { type: 'string' } } },
                {
                    properties: {
                        data: {
                            type: 'object',
                            allOf: [{ $ref: getSchemaPath(dto) }]
                        }
                    }
                }
            ]
        }
    })
)
