import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import { ICreateProduct } from '@modules/products/domain/model/ICreateProduct';
import { IProduct } from '@modules/products/domain/model/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productsExistis = await this.productsRepository.findByName(name);

    if (productsExistis) {
      throw new AppError('There is already one product whith this name!');
    }

    if (process.env.ENV_TEST === 'false') {
      await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });
    return product;
  }
}

export default CreateProductService;
