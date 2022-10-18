import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

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
