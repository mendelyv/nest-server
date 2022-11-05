import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiUpdateResponse = () => applyDecorators(
    ApiResponse({
        schema: {
            allOf: [
                { properties: { status: { type: 'number' } } },
                { properties: { message: { type: 'string' } } },
                { properties: { data: { type: 'array', items: { type: 'number' } } } }
            ]
        }
    })
)
