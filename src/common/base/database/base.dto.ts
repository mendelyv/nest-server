import { ApiProperty } from "@nestjs/swagger";

export class DBDataBaseStructure {
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

export class FindAndCountAllStructure<T extends DBDataBaseStructure = any> {
    @ApiProperty({description: '总数'})
    count: number;
    @ApiProperty({description: '数据数组'})
    rows: T[];
}
