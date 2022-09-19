import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomerRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppErrors';

describe('Create Customer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

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
