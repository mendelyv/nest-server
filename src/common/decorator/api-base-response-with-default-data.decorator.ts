import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiBaseResponseWithDefaultData = (dto: string) => applyDecorators(
    ApiResponse({
        schema: {
            allOf: [
                { properties: { status: { type: 'number' } } },
                { properties: { message: { type: 'string' } } },
                {
                    properties: {
                        data: {
                            type: dto,
                        }
                    }
                }
            ]
        }
    })
)
