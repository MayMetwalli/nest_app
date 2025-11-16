import { ConflictException, Injectable, NotFoundException, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Brand } from "src/Models/brand.model";
import { Category } from "src/Models/category.model";
import { ICategory } from "src/Types/category.type"; 
import * as fs from "fs/promises";



@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>){}
    async create(data: ICategory){
        const isExist = await this.categoryModel.findOne({name: data.name})
        if(isExist){
            throw new ConflictException('category already exists')
        }
        if (data.brands && data.brands.length){
            const foundBrands = await this.categoryModel.find({_id:{$id: data.brands}})
            if(foundBrands.length !== data.brands.length){
                throw new NotFoundException('some brands not found')
            }
        }
        const category = await this.categoryModel.create(data,)
        return category 
    }

        async update(categoryId: Types.ObjectId, data: ICategory){
            const category = await this.categoryModel.findOne({_id:categoryId, createdBy: data.createdBy})
            if(!category){
                throw new NotFoundException('category not found')
            }
            if (data.brands && data.brands.length){
            const foundBrands = await this.brandModel.find({_id:{$id: data.brands}})
            if(foundBrands.length !== data.brands.length){
                throw new NotFoundException('some brands not found')
            }
            }
            if (data.brands?.length){
                category.brands = data.brands
            }
            if(data.name){
                category.name = data.name
            }
            if(data.image){
                if (category.image) {
                        try {
                          await fs.unlink(category.image); 
                        } catch (err) {
                          console.warn("Failed to delete old image:", err.message);
                        }
                category.image = data.image
            }
            await category.save()
            return category
}
}

async findAll(){
    return await this.categoryModel.find().populate([{
        path: "brands",
    }])
}

}