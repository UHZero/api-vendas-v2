import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute(): Promise<Customer[] | undefined> {
    const customers = await this.customersRepository.findAll();
    return customers;
  }
}

export default ListCustomersService;
