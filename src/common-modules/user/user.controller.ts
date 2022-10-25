import { Get, Inject, Controller } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('user')
export class UserController {
    @Inject()
    private readonly userService: UserService;

    @Get('all')
    @ApiOperation({ summary: '获取所有后台用户' })
    @ApiResponse({ type: [UserDto] })
    async findAll() {
        return await this.userService.findAll();
    }
}
