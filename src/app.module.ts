
import { MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Users/user.module'; 
import { CategoryModule } from './Category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryService } from './Category/category.service';
import { CategoryController } from './Category/category.controller';
import { LoggerMiddleware } from './Middlewares/logger.middleware';
import { AuthController } from './Auth/auth.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [CategoryModule, AuthModule],
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-app'),
    controllers: [AppController, CategoryController],
    providers: [AppService, CategoryService, LoggerMiddleware, JwtService],
})
export class AppModule {}

