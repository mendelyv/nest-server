import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppCacheModule } from './system/cache/app-cache.module';
import { OssModule } from './system/oss/oss.module';
import { UserModule } from './common-modules/user/user.module';
import { DatabaseModule } from './system/database/database.module';

@Module({
    imports: [
        DatabaseModule.register(),
        AppCacheModule.register(),
        UserModule,
        OssModule.register(),
    ],
    controllers: [AppController],
})
export class AppModule { }
