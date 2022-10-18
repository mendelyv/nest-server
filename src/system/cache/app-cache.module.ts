import { Module, Global, CacheModule } from '@nestjs/common'
import type { CacheModuleOptions } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { envConfig } from 'src/common/config'
import { AppCacheService } from './app-cache.service'

const cacheModuleOptions: CacheModuleOptions = {
  store: 'memory',
  ttl: 5,
  max: 100,
}

if (envConfig.enable_redis) {
  Object.assign(cacheModuleOptions, {
    store: redisStore,
    host: envConfig.redis_host,
    port: envConfig.redis_port,
    auth_pass: envConfig.redis_password,
    db: envConfig.redis_db_index,
    isGlobal: true,
  })
}

@Global()
@Module({
  imports: [CacheModule.register(cacheModuleOptions)],
  providers: [AppCacheService],
  exports: [AppCacheService],
})
export class AppCacheModule {}
