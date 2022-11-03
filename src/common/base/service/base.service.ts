import { Model } from "sequelize-typescript";
import { Type } from '@nestjs/common';

export abstract class BaseService<T extends Model<T>> {
    protected abstract readonly table: Type<T>;
}
