import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const { NODE_ENV = 'production' } = process.env;

export function setupSwagger(app: INestApplication) {

    if(NODE_ENV === 'production') return;

    const defaultDoc = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('Swagger API Example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const doc = SwaggerModule.createDocument(app, defaultDoc);
    SwaggerModule.setup('api', app, doc);

}
