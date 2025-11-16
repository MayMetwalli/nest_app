import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from 'src/Types/product.type';
import { AuthGuard, type AuthRequest } from 'src/Guards/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/Utils/multer';


@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService) {}

    @Post('/create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('images',10,{
        storage: multerOption('./src/uploads/products')
    }))
    create(
        @Req() req: AuthRequest,
        @Body() data: IProduct, 
        @UploadedFile() images: Express.Multer.File[]){
            data.image = images.map(image => image.path)
            data.createdBy = req.user._id
        return this.productService.create(data)
    }
}