import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { User } from "src/Users/user.schema";


@Schema({
    timestamps: true
})
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
        ref: User.name
    })
    createdBy: Types.ObjectId

    @Prop({
        type: String,
        required: true,

    })
    image: string
}

const brandSchema = SchemaFactory.createForClass(Brand);


brandSchema.pre('save', function (next){
    this.slug = slugify(this.name, {
        lower: true,
    })
    next()
})


export const BrandModel = MongooseModule.forFeature([
    {
        name: Brand.name,
        schema: brandSchema
    }
])