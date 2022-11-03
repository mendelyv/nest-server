import { ApiProperty } from "@nestjs/swagger";

export class BaseDBDto {
    @ApiProperty({required: true})
    id: number;

    @ApiProperty({
        type: 'string',
        description: '创建时间',
        required: false
    })
    createdAt?: string | number;

    @ApiProperty({
        type: 'string',
        description: '修改时间',
        required: false
    })
    updatedAt?: string | number;
}

export class FindAndCountAllDto<T extends BaseDBDto> {
    @ApiProperty({description: '总数'})
    count: number;
    @ApiProperty({description: '数据数组'})
    rows: T[];
}
