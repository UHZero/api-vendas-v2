import { v4 as uuidv4 } from 'uuid';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICreateOrder } from '@modules/orders/domain/model/ICreateOrder';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.orders.find(order => order.id === id);
    return order;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = new Order();

    order.id = uuidv4();
    order.customer = customer;
    order.order_products = [];

    this.orders.push(order);
    return order;
  }
}

export default FakeOrdersRepository;
