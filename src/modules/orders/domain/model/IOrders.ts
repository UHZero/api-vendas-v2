import { ICustomer } from '@modules/costumers/domain/model/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';
import { IOrderProducts } from './IOrderProducts';

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
