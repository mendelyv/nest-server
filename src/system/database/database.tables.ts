import { ModelCtor } from "sequelize-typescript";

export namespace DB {
    const tables: Array<ModelCtor> = [];
    export function addModel(model: ModelCtor) {
        tables.push(model);
    }
    export function getTables() { return tables; }
}
