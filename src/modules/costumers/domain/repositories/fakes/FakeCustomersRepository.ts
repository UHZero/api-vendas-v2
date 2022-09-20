import { v4 as uuidv4 } from 'uuid';
import Customer from '@modules/costumers/infra/typeorm/entities/Customer';
import { ICreateCustomer } from '@modules/costumers/domain/model/ICreateCustomer';
import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    const newDB = this.customers.filter(Icustomer => Icustomer != customer);
    this.customers = newDB;
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
