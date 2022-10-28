import { ApiProperty, ApiPropertyOptions, getSchemaPath } from "@nestjs/swagger";
import { DBDataBaseStructure, FindAndCountAllStructure } from "../database/base.dto";
import { BaseResponseWithData } from "./base.dto";

export class FindOneResponse<T = any> extends BaseResponseWithData<T> { }
export class FindAllResponse<T extends {} = any> extends BaseResponseWithData<T[]> { }
export class FindAndCountAllResponse<T extends DBDataBaseStructure = any> extends BaseResponseWithData<FindAndCountAllStructure<T>> { }
export function findAndCountAllStructureApiProperty(ctor: any): ApiPropertyOptions {
    return {
        properties: {
            count: {
                type: 'number'
            },
            rows: {
                type: 'array',
                items: { allOf: [{ $ref: getSchemaPath(ctor) }] }
            }
        }
    }
}
export class CreateStructure {
    createdAt: string;
    updatedAt: string;
}
export class CreateResponse extends FindOneResponse { }
export class UpdateResponse extends BaseResponseWithData<Array<number>> {
    @ApiProperty({type: 'array', items: { type: 'number' }})
    data: number[];
}
export class DeleteResponse extends BaseResponseWithData<number> { }
