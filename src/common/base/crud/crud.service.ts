import { DestroyOptions, FindAndCountOptions, Op, UpdateOptions } from "sequelize";
import { Model } from "sequelize-typescript";
import { BaseFindAllQuery } from "../http/base.dto";
import { BaseService } from "../service/base.service";
import { Type } from "@nestjs/common";

export abstract class CRUDService<T extends Model<T>> extends BaseService<T> {
    protected abstract readonly table: Type<T>;
    async index(packet?: BaseFindAllQuery) {
        const page = packet ? (packet.page || null) : null;
        const limit = packet ? (packet.limit || null) : null;
        const options: FindAndCountOptions = {
            where: {},
            subQuery: false,
            offset: (+(page || 1) - 1) * +limit || 0,
            limit: +limit || 20,
            order: [
                ['created_at', 'DESC'],
            ],
        };
        let data = await (this.table as any).findAndCountAll(options);
        return data;
    }
    async show(id: string) {
        return await (this.table as any).findByPk(id);
    }
    async create(packet: any) {
        return await (this.table as any).create(packet);
    }
    async update(id: string, packet: any) {
        let options: UpdateOptions = {
            where: { id: id },
        }
        return await (this.table as any).update(packet, options);
    }
    async destroy(ids: string) {
        let idArr = ids.split(',');
        let options: DestroyOptions = {
            where: {
                id: {
                    [Op.in]: idArr
                }
            }
        }
        return await (this.table as any).destroy(options);
    }
}
