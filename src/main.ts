import { NestFactory } from '@nestjs/core';
import { SalleMusculationModule } from './salleMusculation.module';

async function bootstrap() {
    const app = await NestFactory.create(SalleMusculationModule);
    await app.listen(8080);
}
bootstrap();
