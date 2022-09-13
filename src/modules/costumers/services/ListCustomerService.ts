import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomersPaginate } from '../domain/model/ICustomersPaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICustomersPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });
    return customers;
  }
}

export default ListCustomersService;
