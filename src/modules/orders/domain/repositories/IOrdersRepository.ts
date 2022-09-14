import { ICreateOrder } from '../model/ICreateOrder';
import { IOrder } from '../model/IOrders';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  create(data: ICreateOrder): Promise<IOrder>;
}
