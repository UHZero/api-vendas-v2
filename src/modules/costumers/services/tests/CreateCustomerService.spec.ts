import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomerRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppErrors';

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomer: CreateCustomerService;

describe('Create Customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });
  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    expect(
      createCustomer.execute({
        name: 'Teste Name',
        email: 'emailteste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
