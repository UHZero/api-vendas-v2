import { IOrderProducts } from '@modules/orders/domain/model/IOrderProducts';

export interface IProduct {
  id: string;
  order_products?: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
