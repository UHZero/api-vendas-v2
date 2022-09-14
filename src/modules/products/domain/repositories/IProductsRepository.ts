import { IProduct } from '../model/IProduct';
import { IFindProducts } from '../model/IFindProducts';
import { ICreateProduct } from '../model/ICreateProduct';
import { IUpdateStockProduct } from '../model/IUpdateStockProduct';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAll(): Promise<IProduct[]>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
