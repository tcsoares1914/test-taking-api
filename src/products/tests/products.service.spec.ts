import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, ObjectId } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from '@src/products/products.service';
import { Product } from '@src/products/schemas/product.schema';
import { ProductTestMocks } from '@src/commom/tests/mocks/products.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  const mockModel = {
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Product.name),
          useValue: mockModel,
        },
        ProductsService,
      ],
    }).compile();

    mockModel.save.mockReset();
    mockModel.find.mockReset();
    mockModel.findById.mockReset();
    mockModel.findByIdAndUpdate.mockReset();
    mockModel.findByIdAndDelete.mockReset();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When try to list all products.', () => {
    it('should return a list all products.', async () => {
      const query = { page: '1', keyword: 'test' };
      const products = ProductTestMocks.getProducts();
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([products]),
            }),
          }) as any,
      );

      const result = await service.findAll(query);

      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: 'test', $options: 'i' },
      });

      expect(result).toEqual([products]);
    });
  });

  describe('When try to list one product.', () => {
    it('should list one product.', async () => {
      const product = ProductTestMocks.getValidProduct();
      mockModel.findById.mockReturnValue(product);
      const id = '000000000000000000000000';
      const findAction = await service.findOne(id);

      expect(findAction).toMatchObject(product);
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
    });
    it('should throw an BadRequestException when list one product.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when list one product.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000000000000000000000000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Product not found!',
        });
      });
    });
  });

  describe('When try to update product data.', () => {
    it('should update a one product data.', async () => {
      const products = ProductTestMocks.getProducts();
      const id = '000000000000000000000000';
      const updatedProduct = {
        title: 'Updated title',
      };
      mockModel.findByIdAndUpdate.mockReturnValue({
        ...products[0],
        ...updatedProduct,
      });

      const updateAction = await service.update(id, updatedProduct);

      expect(updateAction).toMatchObject(updatedProduct);
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });
    it('should throw an BadRequestException when list one product.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';
      const data = { description: 'test' };

      await service.update(id, data).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when update one product.', async () => {
      const id = '000000000000000000000000';
      const updatedProduct = {
        title: 'Updated title',
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Product not found!'));

      await service.update(id, updatedProduct).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Product not found!',
        });
      });
    });
  });

  describe('When try to delete product.', () => {
    it('should delete one product.', async () => {
      const product = ProductTestMocks.getValidProductDto();
      mockModel.findById.mockReturnValue(product);
      mockModel.findByIdAndDelete.mockReturnValue(product);
      const id = '000000000000000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toMatchObject(product);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw an BadRequestException when list one product.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when delete one product.', async () => {
      const product = ProductTestMocks.getValidProductDto();
      mockModel.findById.mockReturnValue(product);
      mockModel.findByIdAndDelete.mockReturnValue(null);
      const id = '000000000000000000000000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Product not found!',
        });
      });
    });
  });
});
