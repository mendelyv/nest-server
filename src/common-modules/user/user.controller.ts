import { Get, Inject, Controller, Post, UsePipes, Body, Put, UseGuards, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { accessToken } from "src/common/constants/token.constants";
import { ReqUser } from "src/common/decorator/user.decorator";
import { AuthGuard } from "src/common/guard/auth.guard";
import { ValidationPipe } from "src/common/pipe/validate.pipe";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserRequest, UpdateUserPasswordRequest, UpdateUserRequest } from "./dto/user.dto";
import { ApiBaseResponseWithGenericData } from "src/common/decorator/api-base-response-with-generic-data.decorator";
import { ApiBaseResponseWithGenericArray } from "src/common/decorator/api-base-response-with-generic-array.decorator";
import { BaseFindAllQuery, BaseResponseWithData } from "src/common/base/http/base.dto";
import { ApiUpdateResponse } from "src/common/decorator/api-update-response.decorator";

@Controller('api/backend/user')
@ApiTags('用户')
@ApiBearerAuth(accessToken)
@UseGuards(AuthGuard)
export class UserController {

    @Inject()
    protected readonly service: UserService;


    @Get('profile')
    @ApiOperation({ summary: '获取用户信息' })
    @ApiBaseResponseWithGenericData(User)
    async getProfile(@ReqUser() user: { username: string, id: string }) {
        return await this.service.getProfile(user);
    }


    @Post('profile')
    @ApiOperation({ summary: '更新用户信息' })
    @ApiBaseResponseWithGenericData(User)
    async updateProfile(@ReqUser() user: { username: string, id: string }, @Body() packet: UpdateUserRequest) {
        return await this.service.updateProfile(user, packet);
    }


    @Put('password')
    @ApiOperation({ summary: '修改密码' })
    @ApiBaseResponseWithGenericData(User)
    @UsePipes(ValidationPipe)
    async updatePassword(@ReqUser() user: { username: string, id: string }, @Body() packet: UpdateUserPasswordRequest) {
        return await this.service.updatePassword(user, packet);
    }

    @Get()
    @ApiOperation({ summary: '列表' })
    @ApiBaseResponseWithGenericArray(User)
    async findAll(@Query() packet?: BaseFindAllQuery) {
        return new BaseResponseWithData(await this.service.findAll(packet));
    }


    @Get(':id')
    @ApiOperation({ summary: '查' })
    @ApiBaseResponseWithGenericData(User)
    async findOne(@Param('id') id: string) {
        return new BaseResponseWithData(await this.service.findOne(id));
    }


    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '增' })
    @ApiBaseResponseWithGenericData(User)
    async create(@Body() packet: CreateUserRequest) {
        return new BaseResponseWithData(await this.service.create(packet));
    }


    @Put(':id')
    @ApiOperation({ summary: '改' })
    @UsePipes(ValidationPipe)
    @ApiUpdateResponse()
    async update(@Param('id') id: string, @Body() packet: UpdateUserRequest) {
        return new BaseResponseWithData(await this.service.update(id, packet));
    }
}
