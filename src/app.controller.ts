import { Get, Controller, Render } from "@nestjs/common";

@Controller()
export class AppController {
    constructor() { }

    @Get()
    @Render('hello.html')
    root() {
        return { message: 'Hello NestJS' };
    }
}
