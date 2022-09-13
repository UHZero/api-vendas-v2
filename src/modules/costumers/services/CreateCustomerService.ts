import AppError from '@shared/errors/AppErrors';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '../domain/model/ICreateCustomer';
import { ICustomer } from '../domain/model/ICustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email Adress alread used!');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
