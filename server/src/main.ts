import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:'http://localhost:3000',
    credential :true,
  })

  // for vaidation dto data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true  ,// remove extra feilds
      forbidNonWhitelisted:true,
      transform:true , // auto type convertion   
    })
    )

    // for global error 
    app.useGlobalFilters(new GlobalHttpExceptionFilter())

    // interceptor - Response 
    app.useGlobalInterceptors(new ResponseInterceptor());



  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
