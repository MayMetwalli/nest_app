import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { UserModel } from "src/Models/user.model";
import { CategoryModel } from "src/Models/category.model";
import { BrandModel } from "src/Models/brand.model";
import { ProductModel } from "src/Models/product.model";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports:[
        UserModel,
        CategoryModel,
        BrandModel,
        ProductModel,
    ],
    controllers: [ProductController],
    providers: [ProductService, JwtService],
})

export class ProductModule {}