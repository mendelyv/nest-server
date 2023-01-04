import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value, { excludeExtraneousValues: true });
        const errors = await validate(object);
        let info = 'Bad Request Exception';
        if (errors.length > 0) {
            info = this.formatValidationError(errors);
            throw new BadRequestException(info);
        }
        return object;
    }


    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }


    /**
     * 格式化class-validator错误信息
     */
    private formatValidationError(errors: ValidationError[]) {
        let ret = '';
        for (let i = 0; i < errors.length; i++) {
            let error = errors[i];
            if (error.constraints) {
                let keys = Object.keys(error.constraints);
                for (let j = 0; j < keys.length; j++) {
                    ret += `${error.constraints[keys[j]]}`;
                    if (j != keys.length - 1) ret += ' | ';
                }
            } else if (error.children && error.children.length > 0) {
                ret += this.formatValidationError(error.children);
            }
            if (i != errors.length - 1) ret += ' | ';
        }
        return ret;
    }
}
