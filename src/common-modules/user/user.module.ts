import { Module } from '@nestjs/common';
import { Swagger } from 'src/swagger';
import { userProviders } from './providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, userProviders[0]],
    exports: [UserService]
})
export class UserModule { }

Swagger.addModel(Swagger.ESwagger.Common, UserModule);
