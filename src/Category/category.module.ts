import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, categorySchema } from 'src/Models/category.model';
import { Brand, brandSchema } from 'src/Models/brand.model';
import { UsersModule } from 'src/Users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
      { name: Brand.name, schema: brandSchema },
    ]),
    UsersModule, 
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
