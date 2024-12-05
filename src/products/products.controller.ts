import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Query as QueryParams } from 'express-serve-static-core';
import { ProductsService } from '@src/products/products.service';
import { CreateProductDto } from '@src/products/dto/create-product.dto';
import { UpdateProductDto } from '@src/products/dto/update-product.dto';
import { Product } from '@src/products/schemas/product.schema';

@Controller('products')
export class ProductsController {
  /**
   * Inject service dependency.
   */
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Create new collection item.
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  /**
   * List all collection items.
   */
  @Get()
  async findAll(@Query() query?: QueryParams): Promise<Product[]> {
    return await this.productsService.findAll(query);
  }

  /**
   * List one collection item.
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  /**
   * Update one collection item.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  /**
   * Delete one collection item.
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(id);
  }
}
