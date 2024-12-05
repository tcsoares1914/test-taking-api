import { Product } from '@src/products/schemas/product.schema';
import { CreateProductDto } from '@src/products/dto/create-product.dto';

export class ProductTestMocks {
  static getValidProduct(): Product {
    const product = new Product();
    product.title = 'Title One';
    product.description = 'Description for title one';
    product.price = 4.99;
    product.photo = 'https://domain.com/assets/picture1.png';

    return product;
  }

  static getValidProductDto(): CreateProductDto {
    const product = new CreateProductDto();
    product.title = 'Title One';
    product.description = 'Description for title one';
    product.price = 4.99;
    product.photo = 'https://domain.com/assets/picture1.png';

    return product;
  }

  static getProducts(): Product[] {
    const products: Product[] = [
      {
        title: 'Title One',
        description: 'Description for title one',
        price: 4.999,
        photo: 'https://domain.com/assets/picture1.png',
        created: new Date(),
        updated: new Date(),
      },
      {
        title: 'Title Two',
        description: 'Description for title two',
        price: 2.999,
        photo: 'https://domain.com/assets/picture2.png',
        created: new Date(),
        updated: new Date(),
      },
    ];

    return products;
  }

  static getNewProduct(): Product {
    const newProduct: Product = new Product({
      title: 'Product One',
      description: 'https://domain.com/assets/picture1.png',
      price: 4999,
      photo: 'https://domain.com/assets/picture1.png',
    });

    return newProduct;
  }

  static getUpdatedProduct() {
    return new Product({
      title: 'Title updated',
    });
  }
}
