import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        let info = 'Bad Request Exception';
        if (errors.length > 0) {
            info = '';
            for (let i = 0; i < errors.length; i++) {
                let error = errors[i];
                if (!error.constraints) continue;
                let keys = Object.keys(error.constraints)
                for (let j = 0; j < keys.length; j++) {
                    info += error.constraints[keys[j]];
                }
                if (i != errors.length - 1)
                    info += ' | ';
            }
            throw new BadRequestException(info);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
