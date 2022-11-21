import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
const { NODE_ENV = 'production' } = process.env;

export namespace Swagger {

    export enum ESwagger {
        /** 通用模块 */
        Common,
    }

    const models: { [key: number]: Array<Function> } = {}

    export function setupSwagger(app: INestApplication) {

        if (NODE_ENV === 'production') return;

        const defaultDoc = new DocumentBuilder()
            .setTitle('Example API')
            .setDescription('Swagger API Example')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const doc = SwaggerModule.createDocument(app, defaultDoc, {
            include: models[ESwagger.Common]
        });
        SwaggerModule.setup('api', app, doc);
    }

    /**
     * 添加模块至swagger
     * @param swaggerType - swagger类型
     * @param model - 模块类
     */
    export function addModel(swaggerType: ESwagger, model: Function) {
        if (!models[swaggerType]) models[swaggerType] = [];
        models[swaggerType].push(model);
    }

    function getDefaultBearerOption(description: string = 'Default Bearer description') {
        const res: SecuritySchemeObject = {
            description: description,
            name: 'Authorization',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header',
        }
        return res;
    }

}
