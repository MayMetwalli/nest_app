import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { type IBrand } from "src/Types/brand.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthGuard, type AuthRequest } from "src/Guards/auth.guard";


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
}