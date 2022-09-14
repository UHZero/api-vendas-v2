import { ICustomer } from '@modules/costumers/domain/model/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}
