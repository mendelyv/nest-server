import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/system/database/database.module';
import { userProviders } from './providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, userProviders[0]],
    exports: [UserService]
})
export class UserModule { }
