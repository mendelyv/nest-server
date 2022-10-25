import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class UserDto {

    @Expose()
    @ApiProperty({
        description: '昵称'
    })
    @IsString()
    displayName: string;

    @Expose()
    @ApiProperty({
        description: '邮箱'
    })
    @IsString()
    email: string;

    @Expose()
    @ApiProperty({
        description: '手机号'
    })
    @IsString()
    mobile: string;

}
