import { brandSchema, Brand } from 'src/Models/brand.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandService } from './brand.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])
  ],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
