import { getRepository, In, Repository } from 'typeorm';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '../entities/Product';
import { IFindProducts } from '@modules/products/domain/model/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/model/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/model/IUpdateStockProduct';
import RedisCache from '@shared/cache/RedisCache';

class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = getRepository(Product);
  }
  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    if (process.env.ENV_TEST === 'false') {
      await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    }
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });
    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    if (process.env.ENV_TEST === 'false') {
      await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    }
    await this.ormRepository.save(product);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    if (process.env.ENV_TEST === 'false') {
      await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    }
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    if (process.env.ENV_TEST === 'false') {
      await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    }
    await this.ormRepository.save(products);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });
    return existentProducts;
  }
}

export default ProductRepository;
