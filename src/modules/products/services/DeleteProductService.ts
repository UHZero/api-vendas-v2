import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/model/IDeleteProduct';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found!');
    }

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
