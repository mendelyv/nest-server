import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiBaseResponseWithGenericData = <T extends Type<unknown>>(dto: T) => applyDecorators(
    ApiExtraModels(dto),
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
