import { Inject, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { FindOptions } from "sequelize";
import { CRUDService } from "src/common/base/crud/crud.service";
import { BaseResponse, BaseResponseWithData } from "src/common/base/http/base.dto";
import { userRespositoryProvider } from "src/common/constants/repository.constants";
import { UpdateUserPasswordRequest, UpdateUserRequest } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService extends CRUDService<User> {
    @Inject(userRespositoryProvider)
    protected readonly table: typeof User;


    /** 获取个人信息 */
    async getProfile(user: { username: string, id: string }): Promise<BaseResponse | BaseResponseWithData<User>> {
        const op: FindOptions = {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
            }
        }
        if (!user) return new BaseResponse(401, '登录状态失效');
        const data = await this.table.findByPk(user.id, op)
        return new BaseResponseWithData<User>(data);
    }


    /**
     * 更新数据
     * @param user - 
     * @param packet - 
     * @returns 
     */
    async updateProfile(user: { username: string, id: string }, packet: UpdateUserRequest): Promise<BaseResponse | BaseResponseWithData<User>> {
        if (!user) return new BaseResponse(401, '登录状态失效');
        const data = await this.table.findByPk(user.id);
        if (!data) return new BaseResponse(202, '用户不存在');
        delete packet.password;
        let res = await data.update(packet);
        return new BaseResponseWithData<User>(plainToClass(User, res, { excludeExtraneousValues: true }));
    }


    /**
     * 修改密码
     * @param user - 
     * @param packet - 
     * @returns 
     */
    async updatePassword(user: { username: string, id: string }, packet: UpdateUserPasswordRequest): Promise<BaseResponse | BaseResponseWithData<User>> {
        if (!user) return new BaseResponse(401, '登录状态失效');
        const data = await this.table.findByPk(user.id)
        if (!data) return new BaseResponse(202, '用户不存在');
        if (data.password !== packet.oldPwd) return new BaseResponse(202, '原密码错误，修改失败');
        let res = await data.update({ password: packet.newPwd })
        return new BaseResponseWithData<User>(res);
    }

}
