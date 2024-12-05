import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Query as QueryParams } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto } from '@src/products/dto/create-product.dto';
import { UpdateProductDto } from '@src/products/dto/update-product.dto';
import { Product } from '@src/products/schemas/product.schema';

@Injectable()
export class ProductsService {
  /**
   * Inject repository dependency.
   */
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  /**
   * Create new collection item.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    const newProduct = await product.save();

    if (!newProduct) {
      throw new InternalServerErrorException(
        'Problem to create a product. Try again!',
      );
    }

    return newProduct;
  }

  /**
   * List all collection items.
   */
  async findAll(query?: QueryParams): Promise<Product[]> {
    const limit = Number(query.limit) || 10;
    const currentPage = Number(query.page) || 1;
    const skip = limit * (currentPage - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const products = await this.productModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);

    return products;
  }

  /**
   * List one collection item.
   */
  async findOne(id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return product;
  }

  /**
   * Update one collection item.
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }

    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
    );

    return product;
  }

  /**
   * Delete one collection item.
   */
  async remove(id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }

    const product = this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return product;
  }
}
