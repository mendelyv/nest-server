import { ApiProperty } from "@nestjs/swagger";
import { BaseDBDto, FindAndCountAllDto } from "../database/base.dto";
import { BaseResponseWithData } from "./base.dto";

export class FindOneResponse<T extends BaseDBDto> extends BaseResponseWithData<T> { }
export class FindAllResponse<T extends BaseDBDto> extends BaseResponseWithData<T[]> { }
export class FindAndCountAllResponse<T extends BaseDBDto> extends BaseResponseWithData<FindAndCountAllDto<T>> { }
export class CreateStructure {
    createdAt: string;
    updatedAt: string;
}
export class CreateResponse<T extends BaseDBDto> extends FindOneResponse<T> { }
export class UpdateResponse extends BaseResponseWithData<Array<number>> {
    @ApiProperty({type: 'array', items: { type: 'number' }})
    data: number[];
}
export class DeleteResponse extends BaseResponseWithData<number> { }
