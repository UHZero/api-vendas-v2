import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppErrors';
import CreateCustomerService from '../CreateCustomerService';
import DeleteCustomerService from '../DeleteCustomerService';

describe('Delete Customer', () => {
  it('should be able to remove a customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const removeCustomer = new DeleteCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    expect(await removeCustomer.execute(customer)).toBeUndefined();
  });

  it('should not be able to remove a customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const removeCustomer = new DeleteCustomerService(fakeCustomerRepository);

    await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const customerNotExists = {
      id: '123456',
      name: 'Test',
      email: 'notemail@email.com',
    };

    expect(removeCustomer.execute(customerNotExists)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
