import { ICreateCustomer } from '../model/ICreateCustomer';
import { ICustomer } from '../model/ICustomer';
import { ICustomersPaginate } from '../model/ICustomersPaginate';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<ICustomersPaginate>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
