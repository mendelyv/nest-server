import { Get, Inject, Controller, Post, UsePipes, Body, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { DeleteResponse, UpdateResponse } from "src/common/base/http/crud.dto";
import { accessToken } from "src/common/constants/token.constants";
import { ReqUser } from "src/common/decorator/user.decorator";
import { AuthGuard } from "src/common/guard/auth.guard";
import { ValidationPipe } from "src/common/pipe/validate.pipe";
import { CreateUserResponse, CreateUserDto, FindAndCountAllUserResponse, FindOneUserResponse, UpdateUserDto, UpdateUserPasswordDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('api/backend/user')
@ApiTags('用户')
// @ApiBearerAuth(accessToken)
// @UseGuards(AuthGuard)
export class UserController {

    @Inject()
    private readonly userService: UserService;


    @Get('profile')
    @ApiOperation({ summary: '获取用户信息' })
    @ApiResponse({ type: FindOneUserResponse })
    async getProfile(@ReqUser() user: { username: string, id: string }) {
        return await this.userService.getProfile(user);
    }


    @Post('profile')
    @ApiOperation({ summary: '更新用户信息' })
    @ApiResponse({ type: FindOneUserResponse })
    async updateProfile(@ReqUser() user: { username: string, id: string }, @Body() packet: UpdateUserDto) {
        return await this.userService.updateProfile(user, packet);
    }


    @Put('password')
    @ApiOperation({ summary: '修改密码' })
    @ApiResponse({ type: FindOneUserResponse })
    @UsePipes(ValidationPipe)
    async updatePassword(@ReqUser() user: { username: string, id: string }, @Body() packet: UpdateUserPasswordDto) {
        return await this.userService.updatePassword(user, packet);
    }


    @Get()
    @ApiOperation({ summary: '获取所有后台用户' })
    @ApiResponse({ type: FindAndCountAllUserResponse })
    async findAll() {
        let data = await this.userService.findAll();
        return new FindAndCountAllUserResponse(data);
    }


    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '创建用户' })
    @ApiResponse({ type: CreateUserResponse })
    async create(@Body() createDto: CreateUserDto) {
        let data = await this.userService.create(createDto);
        return new CreateUserResponse(data);
    }


    @Get(':id')
    @ApiOperation({ summary: '用户详情' })
    @ApiResponse({ type: FindOneUserResponse })
    async findOne(@Param('id') id: string) {
        let data = await this.userService.findOne(+id);
        return new FindOneUserResponse(data);
    }


    @Put(':id')
    @ApiOperation({ summary: '更新用户信息' })
    @ApiResponse({ type: UpdateResponse })
    async update(@Param('id') id: string, @Body() packet: UpdateUserDto) {
        let data = await this.userService.update(+id, packet);
        return new UpdateResponse(data);
    }


    @Delete(':id')
    @ApiOperation({ summary: '删除用户' })
    @ApiResponse({ type: DeleteResponse })
    async remove(@Param('id') id: string) {
        let data = await this.userService.remove(id);
        return new DeleteResponse(data);
    }


}
