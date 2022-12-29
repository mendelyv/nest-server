import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class MockValidatorPipe {
    async check(value: any, metatype: any) {
        if (!metatype || !this.toValidate(metatype)) {
            return false;
        }
        const object = plainToClass(metatype, value, { excludeExtraneousValues: true });
        const errors = await validate(object);
        if (errors.length > 0) {
            let info = '';
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
            console.log(info);
            return false;
        }
        return true;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
