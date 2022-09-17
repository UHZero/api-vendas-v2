import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/costumers/infra/typeorm/repositories/CostumersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUserTokenRepository } from '@modules/users/domain/model/IUserTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/users/domain/model/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
