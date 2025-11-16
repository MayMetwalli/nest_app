import { ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Brand } from "src/Models/brand.model";
import { IBrand } from "src/Types/brand.type";
import * as fs from "fs/promises";

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(data: IBrand) {
    const isExist = await this.brandModel.findOne({ name: data.name });
    if (isExist) {
      throw new ConflictException("Brand already exists");
    }

    return await this.brandModel.create(data);
  }

  async updateBrand(brandId: Types.ObjectId, data: IBrand) {
    const brand = await this.brandModel.findOne({
      _id: brandId,
      createdBy: data.createdBy,
    });

    if (!brand) {
      throw new NotAcceptableException("brand not found");
    }

    if (data.name) {
      brand.name = data.name;
    }

    if (data.image) {
      if (brand.image) {
        try {
          await fs.unlink(brand.image); 
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }
      brand.image = data.image;
    }

    return await brand.save();
  }


  async findOne(id: Types.ObjectId){
    const brand = await this.brandModel.findOne({_id: id})
    if(!brand){
        throw new NotAcceptableException('brand not found')
    }
    return brand
  }
  async findAll(){
    return await this.brandModel.find()
  }
}
