import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import RedisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '@modules/products/domain/model/ICreateProduct';
import { IProduct } from '@modules/products/domain/model/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

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

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
