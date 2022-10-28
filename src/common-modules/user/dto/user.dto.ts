import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { DBDataBaseStructure, FindAndCountAllStructure } from "src/common/base/database/base.dto";
import { CreateResponse, FindAndCountAllResponse, findAndCountAllStructureApiProperty, FindOneResponse } from "src/common/base/http/crud.dto";


export class User extends DBDataBaseStructure {

    @ApiProperty({ description: '用户名' })
    username: string;

    @ApiProperty({ description: '密码' })
    password: string;

    @ApiProperty({ description: '显示名称' })
    displayName: string;

    @ApiProperty({ description: '邮箱' })
    email: string;

    @ApiProperty({ description: '手机号' })
    mobile: string;

    @ApiProperty({ description: '性别: 1为男，2为女' })
    sex: number;

    @ApiProperty({ description: '头像' })
    profileImageUrl: string

    @ApiProperty({ description: '简介' })
    introduction: string;

    @ApiProperty({ description: '简介' })
    roleId: number;

    @ApiProperty({ description: '是否可用' })
    isEnabled: boolean;

    @ApiProperty({ description: 'github id' })
    githubId: string;

    @ApiProperty({ description: '微信 id' })
    weixinId: string;

    @ApiProperty({ description: '钉钉 id' })
    dingtalkId: string;
}

export class FindAndCountAllUserResponse extends FindAndCountAllResponse {
    @ApiProperty(findAndCountAllStructureApiProperty(User))
    data: FindAndCountAllStructure<User>;
}

export class CreateUserDto {

    @ApiProperty({ description: '用户名', required: false })
    username: string;

    @ApiProperty({ description: '密码', required: false })
    password: string;

    @ApiProperty({ description: '显示名称', required: false })
    displayName: string;

    @ApiProperty({ description: '邮箱', required: false })
    email: string;

    @ApiProperty({ description: '手机号', required: false })
    mobile: string;

    @ApiProperty({ description: '性别: 1为男，2为女', required: false })
    sex: number;

    @ApiProperty({ description: '头像', required: false })
    profileImageUrl: string

    @ApiProperty({ description: '简介', required: false })
    introduction: string;

    @ApiProperty({ description: '简介', required: false })
    roleId: number;

    @ApiProperty({ description: '是否可用', required: false })
    isEnabled: boolean;

    @ApiProperty({ description: 'github id', required: false })
    githubId: string;

    @ApiProperty({ description: '微信 id', required: false })
    weixinId: string;

    @ApiProperty({ description: '钉钉 id', required: false })
    dingtalkId: string;
}

export class UpdateUserDto extends CreateUserDto { }

export class CreateUserResponse extends CreateResponse {
    @ApiProperty()
    data: User;
}

export class FindOneUserResponse extends FindOneResponse<User> {
    @ApiProperty()
    data: User;
}

export class UpdateUserPasswordDto {
    @ApiProperty()
    @IsString()
    oldPwd: string;

    @ApiProperty()
    @IsString()
    newPwd: string;
}
