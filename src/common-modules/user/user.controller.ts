import { Get, Inject, Controller, Post, UsePipes, Body, Put, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { CRUDController } from "src/common/base/crud/crud.controller";
import { BaseFindAllQuery } from "src/common/base/http/base.dto";
import { accessToken } from "src/common/constants/token.constants";
import { ReqUser } from "src/common/decorator/user.decorator";
import { AuthGuard } from "src/common/guard/auth.guard";
import { ValidationPipe } from "src/common/pipe/validate.pipe";
import { CreateUserDto, CreateUserResponse, FindAndCountAllUserResponse, FindOneUserResponse, UpdateUserDto, UpdateUserPasswordDto, UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { CRUD } from 'src/common/decorator/crud.decorator'

@Controller('api/backend/user')
@ApiTags('用户')
@ApiBearerAuth(accessToken)
@UseGuards(AuthGuard)
@CRUD({
    enabled: [
        'index',
        'update',
        'create',
        'show',
        'destroy'
    ],
    dtos: {
        index: {
            summary: '查找所有用户',
            response: FindAndCountAllUserResponse,
        },
        show: {
            summary: '查询用户详情',
            response: FindOneUserResponse,
        },
        create: {
            summary: '添加用户',
            body: CreateUserDto,
            response: CreateUserResponse,
        },
    }
})
export class UserController extends CRUDController<User, UserDto, BaseFindAllQuery, CreateUserDto, UpdateUserDto> {

    @Inject()
    protected readonly service: UserService;


    @Get('profile')
    @ApiOperation({ summary: '获取用户信息' })
    @ApiResponse({ type: FindOneUserResponse })
    async getProfile(@ReqUser() user: { username: string, id: string }) {
        return await this.service.getProfile(user);
    }


    @Post('profile')
    @ApiOperation({ summary: '更新用户信息' })
    @ApiResponse({ type: FindOneUserResponse })
    async updateProfile(@ReqUser() user: { username: string, id: string }, @Body() packet: UpdateUserDto) {
        return await this.service.updateProfile(user, packet);
    }


    @Put('password')
    @ApiOperation({ summary: '修改密码' })
    @ApiResponse({ type: FindOneUserResponse })
    @UsePipes(ValidationPipe)
    async updatePassword(@ReqUser() user: { username: string, id: string }, @Body() packet: UpdateUserPasswordDto) {
        return await this.service.updatePassword(user, packet);
    }


}
