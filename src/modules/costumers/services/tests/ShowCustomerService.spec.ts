import AppError from '@shared/errors/AppErrors';
import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from '../CreateCustomerService';
import ShowCustomerService from '../ShowCustomerService';

describe('Show Customer', () => {
  it('should be able show a customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const showCustomer = new ShowCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const { id } = customer;

    expect(showCustomer.execute({ id })).toBeTruthy();
  });

  it('should not be able to show a customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const showCustomer = new ShowCustomerService(fakeCustomerRepository);

    await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const id = 'i23i3u2v4-12312kj3v-21v2v1-23v1v23';

    expect(showCustomer.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
