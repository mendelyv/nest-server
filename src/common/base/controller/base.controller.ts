import { Model } from "sequelize-typescript";
import { BaseService } from "../service/base.service";

export abstract class BaseController<T extends Model<T>> {
    protected abstract readonly service: BaseService<T>;
}
