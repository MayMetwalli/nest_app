import { ConflictException, Injectable, NotFoundException, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Brand } from "src/Models/brand.model";
import { Category } from "src/Models/category.model";
import * as fs from "fs/promises";
import { IProduct } from "src/Types/product.type";
import { Product } from "src/Models/product.model";



@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>,
        @InjectModel(Product.name) private productModel: Model<Product>){}
        async create(data: IProduct){
            const brand = await this.brandModel.findOne({_id: data.brand})
            if(!brand){
                throw new Error('brand not found')
            }

            const category = await this.categoryModel.findOne({_id: data.category})
            if(!category){
                throw new Error('category not found')
            }
            data.salePrice = data.originalPrice - (data.discount /100) * data.originalPrice
            const product = await this.productModel.create(data)
                return {
                    data: product
                }
            
    }


}