import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserRequest extends OmitType(User, ['id']) { }

export class UpdateUserRequest extends PartialType(CreateUserRequest) { }

export class UpdateUserPasswordRequest {
    @ApiProperty()
    @IsString()
    oldPwd: string;

    @ApiProperty()
    @IsString()
    newPwd: string;
}
