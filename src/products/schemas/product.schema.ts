import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  collection: 'products',
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  photo: string;

  @Prop()
  created!: Date;

  @Prop()
  updated!: Date;

  constructor(product?: Partial<Product>) {
    this.title = product?.title;
    this.description = product?.description;
    this.price = product?.price;
    this.photo = product?.photo;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
