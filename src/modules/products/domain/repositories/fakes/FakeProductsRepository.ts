import { v4 as uuidv4 } from 'uuid';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { IFindProducts } from '@modules/products/domain/model/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/model/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/model/IUpdateStockProduct';

class FakeProductRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = uuidv4();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    this.products.push(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    Object.assign(this.products, product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    const newDB = this.products.filter(Iproduct => Iproduct != product);
    this.products = newDB;
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    return;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.name === name);
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id);
    return product;
  }

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const existentProducts = this.products.filter(pdt =>
      products.map(p => p.id === pdt.id),
    );
    return existentProducts;
  }
}

export default FakeProductRepository;
