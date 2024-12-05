import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@src/products/products.controller';
import { ProductsService } from '@src/products/products.service';
import { CreateProductDto } from '@src/products/dto/create-product.dto';
import { UpdateProductDto } from '@src/products/dto/update-product.dto';
import { ProductTestMocks } from '@src/commom/tests/mocks/products.mock';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockProducts = ProductTestMocks.getProducts();
  const mockNewProduct = ProductTestMocks.getNewProduct();
  const mockUpdatedProduct = ProductTestMocks.getUpdatedProduct();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    mockService.create.mockReset();
    mockService.findAll.mockReset();
    mockService.findOne.mockReset();
    mockService.update.mockReset();
    mockService.remove.mockReset();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When try to create a new product.', () => {
    it('should create a new product.', async () => {
      const input: CreateProductDto = {
        title: 'Title one',
        description: 'Description for title one',
        price: 1.999,
        photo: 'https://domain.com/assets/picture1.png',
      };

      mockService.create.mockResolvedValue(mockNewProduct);
      const response = await controller.create(input);

      expect(response).toEqual(mockNewProduct);
      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(mockService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('When try to list all products.', () => {
    it('should return a list all products.', async () => {
      mockService.findAll.mockResolvedValue(mockProducts);
      const response = await controller.findAll();

      expect(typeof response).toEqual('object');
      expect(response).toEqual(mockProducts);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
    it('should thow an Error when list all products.', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(service.findAll).rejects.toThrowError();
    });
  });

  describe('When try to list one product.', () => {
    it('should list one product.', async () => {
      mockService.findOne.mockResolvedValue(mockProducts[0]);
      const id = '00000000-0000-0000-0000-000000000000';
      const response = await controller.findOne(id);

      expect(response).toEqual(mockProducts[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw an Error when list one product.', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      const id = '00000000-0000-0000-0000-000000000000';
      expect(service.findOne(id)).rejects.toThrowError();
    });
  });

  describe('When try to update product data.', () => {
    it('should update a one product data.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const input: UpdateProductDto = {
        title: 'Title updated',
      };
      mockService.update.mockResolvedValue(mockUpdatedProduct);
      const result = await controller.update(id, input);

      expect(result).toMatchObject({
        title: input.title,
      });
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, input);
    });
    it('should throw an Error when update one product.', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(service.update).rejects.toThrowError();
    });
  });

  describe('When try to delete product.', () => {
    it('should delete one product.', async () => {
      mockService.remove.mockResolvedValue(undefined);
      const id = '00000000-0000-0000-0000-000000000000';
      const result = await controller.remove(id);

      expect(result).toBeUndefined();
    });
    it('should throw an NotFoundException when delete one product.', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.update).rejects.toThrowError();
    });
  });
});
