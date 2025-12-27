import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:'http://localhost:3000',
    credential :true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true  ,// remove extra feilds
      forbidNonWhitelisted:true,
      transform:true , // auto type convertion   
    })
  )
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
