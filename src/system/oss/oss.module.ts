import { Module } from '@nestjs/common'
import { Swagger } from 'src/swagger';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';

@Module({
    controllers: [OssController],
    providers: [OssService],
    exports: [OssService]
})
export class OssModule { }

Swagger.addModel(Swagger.ESwagger.Common, OssModule);
