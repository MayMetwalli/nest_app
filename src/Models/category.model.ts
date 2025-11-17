import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types, Document } from "mongoose";
import slugify from "slugify";
import { Brand } from "./brand.model";
import { Product } from "./product.model";
import * as fs from "fs/promises";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Category {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    set: function (value: string) {
      this.set({ slug: slugify(value) });
      return value;
    },
  })
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Brand', default: [] })
  brands: Types.ObjectId[];
}

export const categorySchema = SchemaFactory.createForClass(Category);