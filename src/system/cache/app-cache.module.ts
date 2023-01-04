import { DynamicModule } from '@nestjs/common'
import { envConfig } from 'src/common/config'
import { AppCacheService } from './app-cache.service'

export class AppCacheModule {
    static register(): DynamicModule {
        return envConfig.redis.enable ? {
            module: AppCacheModule,
            providers: [AppCacheService],
            exports: [AppCacheService],
            global: true,
        } : {
            module: AppCacheModule,
        }
    }
}
