import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
    const defaultDoc = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('Swagger API Example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const doc = SwaggerModule.createDocument(app, defaultDoc);
    SwaggerModule.setup('api', app, doc);
}
