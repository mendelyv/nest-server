import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppCacheModule } from './system/cache/app-cache.module';
import { OssModule } from './system/oss/oss.module';
import { UserModule } from './common-modules/user/user.module';

@Module({
    imports: [
        AppCacheModule,
        UserModule,
        OssModule,
    ],
    controllers: [AppController],
})
export class AppModule { }
