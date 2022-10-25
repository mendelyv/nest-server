import { Get, Controller, Render, Inject } from "@nestjs/common";
import { AppCacheService } from "./system/cache/app-cache.service";

@Controller()
export class AppController {
    @Inject()
    private readonly cache: AppCacheService;
    constructor() { }

    @Get()
    @Render('hello.html')
    root() {
        return { message: 'Hello NestJS' };
    }


    @Get('redisSet')
    async redisSet() {
        const redis = this.cache.redis;
        return await redis.set('hello', 'hello world');
    }


    @Get('redisGet')
    async redisGet() {
        const redis = this.cache.redis;
        return await redis.get('hello');
    }
}
