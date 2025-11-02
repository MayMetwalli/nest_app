
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Users/user.module'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-app'),

    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
