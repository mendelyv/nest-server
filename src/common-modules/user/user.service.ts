import { Inject, Injectable } from "@nestjs/common";
import { FindOptions, Op } from "sequelize";
import { DestroyOptions, UpdateOptions } from "sequelize";
import { BaseResponse, BaseResponseWithData } from "src/common/base/http/base.dto";
import { userRespositoryProvider } from "src/common/constants/repository.constants";
import { CreateUserDto, FindOneUserResponse, UpdateUserDto, UpdateUserPasswordDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(userRespositoryProvider) private readonly t_user: typeof User
    ) { }

    async findAll() {
        return await this.t_user.findAndCountAll();
    }


    async create(packet: CreateUserDto) {
        return await this.t_user.create(packet);
    }


    async findOne(id: number) {
        return await this.t_user.findByPk(id);
    }


    async update(id: number, packet: UpdateUserDto) {
        let options: UpdateOptions = {
            where: { id: id },
        }
        return await this.t_user.update(packet, options);
    }


    async remove(ids: string) {
        let idArr = ids.split(',');
        let options: DestroyOptions = {
            where: {
                id: {
                    [Op.in]: idArr
                }
            }
        }
        return await this.t_user.destroy(options);
    }


    /** 获取个人信息 */
    async getProfile(user: { username: string, id: string }) {
        const op: FindOptions = {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
            }
        }
        if (!user) return new BaseResponse(401, '登录状态失效');
        const data = await User.findByPk(user.id, op)
        return new FindOneUserResponse(data);
    }


    /**
     * 更新数据
     * @param user - 
     * @param packet - 
     * @returns 
     */
    async updateProfile(user: { username: string, id: string }, packet: UpdateUserDto): Promise<BaseResponse | FindOneUserResponse> {
        if (!user) return new BaseResponse(401, '登录状态失效');
        const data = await User.findByPk(user.id);
        if (!data) return new BaseResponse(202, '用户不存在');
        delete packet.password;
        let res = await data.update(packet);
        return new FindOneUserResponse(res);
    }


    /**
     * 修改密码
     * @param user - 
     * @param packet - 
     * @returns 
     */
    async updatePassword(user: { username: string, id: string }, packet: UpdateUserPasswordDto): Promise<BaseResponse | FindOneUserResponse> {
        if (!user) return new BaseResponse(401, '登录状态失效');
        const data = await User.findByPk(user.id)
        if (!data) return new BaseResponse(202, '用户不存在');
        // if (data.password !== packet.oldPwd) return { message: '原密码错误，修改失败！！', status: 202, }
        if (data.password !== packet.oldPwd) return new BaseResponse(202, '原密码错误，修改失败');
        let res = await data.update({ password: packet.newPwd })
        return new FindOneUserResponse(res);
    }

}
