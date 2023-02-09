import { Attributes, CreationAttributes, DestroyOptions, FindAndCountOptions, Op, UpdateOptions } from "sequelize";
import { Model } from "sequelize-typescript";
import { Col, Fn, Literal } from "sequelize/types/utils";
import { BaseFindAllQuery } from "../http/base.dto";
import { BaseService } from "../service/base.service";

export abstract class CRUDService<T extends Model<T>> extends BaseService {
    protected abstract readonly table: typeof Model<T>;
    async findAll(packet?: BaseFindAllQuery, options?: FindAndCountOptions<T>): Promise<{ rows: T[]; count: number }> {
        const page = packet ? (packet.page || null) : null;
        const limit = packet ? (packet.limit || null) : null;
        let _options: FindAndCountOptions = {
            where: {},
            subQuery: false,
            offset: (+(page || 1) - 1) * +limit || 0,
            limit: +limit || 20,
            order: [
                ['created_at', 'DESC'],
            ],
        };
        if (options) _options = { ...options };
        let data = await (this.table as any).findAndCountAll(_options);
        return data;
    }
    async findOne(id: string | number): Promise<T | null> {
        return await (this.table as any).findByPk(id);
    }
    async create(packet: CreationAttributes<T>): Promise<T> {
        return await (this.table as any).create(packet);
    }
    async update(id: string, packet: { [key in keyof Attributes<T>]?: Attributes<T>[key] | Fn | Col | Literal }): Promise<[affectedCount: number]> {
        let options: UpdateOptions = {
            where: { id: id },
        }
        return await (this.table as any).update(packet, options);
    }
    async destroy(ids: string): Promise<number> {
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
