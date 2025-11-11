import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand } from "src/Models/brand.model";
import { IBrand } from "src/Types/brand.type";


@Injectable()
export class BrandService{

    constructor(@InjectModel(Brand.name)private brandModel: Model<Brand>){}

    async create(data: IBrand){
        const isExist = await this.brandModel.findOne({name: data.name})
        if(isExist){
            throw new ConflictException('Brand already exists')
        }

        return await this.brandModel.create(data)
    }
}