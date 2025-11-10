import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/Users/user.module'; 
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from 'src/Middlewares/logger.middleware';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
