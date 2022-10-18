import { Inject, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { userRespositoryProvider } from "src/common/constants/repository.constants";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(userRespositoryProvider) private readonly userRepository: typeof User
    ) {}

    async findAll() {
        let datas = await this.userRepository.findAll();
        let res = [];
        for(let i = 0; i < datas.length; i++) {
            let data = datas[i];
            res.push(plainToClass(UserDto, data['dataValues'], {excludeExtraneousValues: true}));
        }
        return res;
    }

}
