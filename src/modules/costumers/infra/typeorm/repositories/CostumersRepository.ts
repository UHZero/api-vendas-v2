import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/costumers/domain/model/ICreateCustomer';
// import { ICustomersPaginate } from '@modules/costumers/domain/model/ICustomersPaginate';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<Customer[] | undefined> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRepository;
