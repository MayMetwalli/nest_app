import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './Users/user.module';
import { AuthModule } from './Auth/auth.module';
import { CategoryModule } from './Category/category.module';
import { BrandModule } from './Brand/brand.module';

ConfigModule.forRoot({
  isGlobal: true, 
});

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/nest-app'),
    UsersModule,
    AuthModule,
    BrandModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
