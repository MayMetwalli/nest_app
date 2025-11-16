import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { logger, LoggerMiddleware } from './Middlewares/logger.middleware';
import { AuthGuard } from './Guards/auth.guard';
import { LoggerInterceptor } from './Interceptors/logger.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  // app.useGlobalGuards(AuthGuard)
  // app.use(new LoggerMiddleware)
  // app.use (logger)
  app.useGlobalInterceptors(new LoggerInterceptor())
  await app.listen(process.env.PORT ?? 3000, ()=>{
    console.log(`App is running on port ${process.env.PORT}`)
  })
}
bootstrap();
