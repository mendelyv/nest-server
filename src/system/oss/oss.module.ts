import { DynamicModule, Module } from '@nestjs/common'
import { envConfig } from 'src/common/config';
import { Swagger } from 'src/swagger';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';

@Module({
    controllers: [OssController],
    providers: [OssService],
    exports: [OssService]
})
export class OssModule {
    static register(): DynamicModule {
        return envConfig.oss.enable ? {
            module: OssModule,
            controllers: [OssController],
            providers: [OssService],
            exports: [OssService]
        } : {
            module: OssModule,
        }
    }
}

if (envConfig.oss.enable)
    Swagger.addModel(Swagger.ESwagger.Common, OssModule);
