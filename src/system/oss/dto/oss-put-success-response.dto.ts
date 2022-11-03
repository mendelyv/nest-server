import { ApiProperty } from "@nestjs/swagger";

export class OssPutSuccessResponseDto {
    @ApiProperty()
    status: number;

    @ApiProperty()
    message: string

    @ApiProperty({ description: '文件名' })
    name: string;

    @ApiProperty()
    url: string;
}
