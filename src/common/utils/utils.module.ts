import { Module } from '@nestjs/common';
import { TokenUtils } from './utils.token';

@Module({
    providers: [TokenUtils],
    exports: [TokenUtils]
})
export class UtilsModule { }
