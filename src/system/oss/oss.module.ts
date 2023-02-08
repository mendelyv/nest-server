import { DynamicModule } from '@nestjs/common'
import { envConfig } from 'src/common/config';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';

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
