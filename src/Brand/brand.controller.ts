import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { type IBrand } from "src/Types/brand.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthGuard, type AuthRequest } from "src/Guards/auth.guard";
import { Types } from "mongoose";
import { multerOption } from "src/Utils/multer";


@Controller('brand')
export class BrandController{

    constructor(private readonly brandService: BrandService){}

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: "./src/uploads/brands",
            filename: (req, file, cb)=>{
                const uniqueFileName = Date.now() + "-" + file.originalname
                cb(null, file.originalname)
            }
        })
    }))
    async createBrand(@Req() req:AuthRequest, @Body() data: IBrand, @UploadedFile() image: Express.Multer.File){
        data.image = image.path
        data.createdBy = req.user._id
        return await this.brandService.create(data)
    }

    @Patch('update/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image',{
        storage: multerOption('./src/uploads/brands')
    }))
    async updateBrand(
        @Req() req:AuthRequest, 
        @Body() data: IBrand, 
        @Param('id') brandId: Types.ObjectId, 
        @UploadedFile() image: Express.Multer.File){
        data.image = image.path
            data.createdBy = req.user._id
        return await this.brandService.updateBrand(brandId, data)
    }



    @Get('get/{:id}')
    async find(@Param('id') id: Types.ObjectId){
        if(id){
            return{
                data: await this.brandService.findOne(id)
            } 
        }
        return {
            data: await this.brandService.findAll()
        }
    }
}