import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, productSchema } from 'src/Models/product.model';
import { Category, categorySchema } from 'src/Models/category.model';
import { Brand, brandSchema } from 'src/Models/brand.model';
import { User, UserSchema } from 'src/Users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: categorySchema }]),
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
