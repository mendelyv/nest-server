import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserRequest extends OmitType(User, ['id']) { }

export class UpdateUserRequest extends PartialType(CreateUserRequest) { }

export class UpdateUserPasswordRequest {
    @Expose()
    @ApiProperty()
    @IsString()
    oldPwd: string;

    @Expose()
    @ApiProperty()
    @IsString()
    newPwd: string;
}
