import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ICategory } from "src/Types/category.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/Utils/multer";
import { AuthGuard, AuthRequest } from "src/Guards/auth.guard";
import { Types } from "mongoose";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image',{
        storage: multerOption('/src/uploads/categories')
    }))
    async create(
        @Req() req:AuthRequest, 
        @Body() data: ICategory, 
        @UploadedFile() image: Express.Multer.File){
        data.image = image.path
        data.createdBy
        return this.categoryService.create(data)
    }

    @Patch('update/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image',{
        storage: multerOption('./src/uploads/categories')
    }))
    async updateCategory(
        @Req() req:AuthRequest, 
        @Body() data: ICategory, 
        @Param('id') id: Types.ObjectId, 
        @UploadedFile() image: Express.Multer.File){
        if(image){
            data.image = image.path
        }
            data.createdBy = req.user._id
        return {data: await this.categoryService.update(id, data)}
    }


    @Get('all')
    async findAll(){
        return {data: await this.categoryService.findAll()}
    }
}

