import { CRUDController } from "../base/crud/crud.controller";
import { DECORATORS } from "../constants/crud.constants";

/** 函数key */
export type CRUDMethod =
    | 'index'
    | 'show'
    | 'create'
    | 'update'
    | 'destroy';

export class CRUDDtoOptions {
    /** param参数类型 */
    param?: any;
    /** body参数类型 */
    body?: any;
    /** 接口注释 */
    summary?: any;
    /** 返回值类型 */
    response?: any;
}

export class CRUDOptions {
    /** 增删改查所属父类 */
    parent?: any;
    /** 启用方法 */
    enabled?: CRUDMethod[];
    /** 类型 */
    dtos?: {
        index?: CRUDDtoOptions,
        show?: CRUDDtoOptions,
        create?: CRUDDtoOptions,
        update?: CRUDDtoOptions,
        destroy?: CRUDDtoOptions,
    }
}


/** 增删改查调整swagger metadata装饰器，改装饰器与CRUDController，nestjs\/swagger高度耦合 */
export const CRUD = (options: CRUDOptions) => (target) => {
    let protoName = Object.getOwnPropertyNames(options.parent ? options.parent.prototype : CRUDController.prototype);
    const fixProto = ['constructor', 'service'];
    for (let i = 0; i < protoName.length; i++) {
        let key = protoName[i];
        const isEnabled = options.enabled.find((v) => typeof v === 'string' ? v === key : (v as any).name === key)
        if (!fixProto.includes(key)) {
            if (isEnabled) {
                setupMetadata(target, key, options.dtos[key]);
            } else {
                let _target = options.parent ? options.parent : CRUDController;
                let method = Object.getOwnPropertyDescriptor(_target.prototype, key);
                if (method)
                    Object.defineProperty(_target.prototype, key, {
                        ...method,
                        async value() { }
                    });
            }
        }
    }
    return target;
}


function setupMetadata(target: any, key: string, options: CRUDDtoOptions) {
    if (!options) return;
    let func = target.prototype[key];
    if (options.param) {
        let metas = Reflect.getMetadata(DECORATORS.API_PARAMETERS, func);
        if (metas)
            for (let i = 0; i < metas.length; i++) {
                let meta = metas[i];
                if (meta.in === 'path')
                    meta.type = options.param;
            }
    }
    if (options.body) {
        let metas = Reflect.getMetadata(DECORATORS.API_PARAMETERS, func);
        if (metas)
            for (let i = 0; i < metas.length; i++) {
                let meta = metas[i];
                if (meta.in === 'body')
                    meta.type = options.body;
            }
    }
    if (options.summary) {
        let meta = Reflect.getMetadata(DECORATORS.API_OPERATION, func);
        if (meta) meta.summary = options.summary;
    }
    if (options.response) {
        let meta = Reflect.getMetadata(DECORATORS.API_RESPONSE, func);
        if (meta) meta.default.type = options.response;
    }
}
