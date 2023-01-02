import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiBaseResponseWithDefaultArray = (dto: string) => applyDecorators(
    ApiResponse({
        schema: {
            allOf: [
                { properties: { status: { type: 'number' } } },
                { properties: { message: { type: 'string' } } },
                {
                    properties: {
                        data: {
                            properties: {
                                count: {
                                    type: 'number',
                                },
                                rows: {
                                    type: 'array',
                                    items: { type: dto }
                                }
                            }
                        }
                    }
                }
            ]
        }
    })
)
