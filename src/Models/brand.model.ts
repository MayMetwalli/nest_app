import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { User } from "src/Users/user.schema";
import { Product } from "./product.model";
import * as fs from "fs/promises";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Brand{
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    name: string

    @Prop({
        type: String,
        required: true,
        unique: true,
        set: function(value: string){
            this.set({slug: slugify(value)}) 
            return value
        }
    })
    slug: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    })
    createdBy: Types.ObjectId

    @Prop({
        type: String,
        required: true,

    })
    image: string
}

const brandSchema = SchemaFactory.createForClass(Brand);


brandSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

brandSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'brand',
  justOne: false
});


brandSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  const brandId = doc._id;

  const deletedProducts = await mongoose.model(Product.name).find({ brand: brandId });

  for (const product of deletedProducts) {
    if (product.image && product.image.length > 0) {
      for (const img of product.image) {
        try {
          await fs.unlink(img);
        } catch {}
      }
    }
  }

  await mongoose.model(Product.name).deleteMany({ brand: brandId });
});



// export const BrandModel = MongooseModule.forFeature([
//     {
//         name: Brand.name,
//         schema: brandSchema
//     }
// ])

export { brandSchema }