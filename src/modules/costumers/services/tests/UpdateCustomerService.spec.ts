import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppErrors';
import CreateCustomerService from '../CreateCustomerService';
import UpdateCustomerService from '../UpdateCustomerService';

describe('Update Customer', () => {
  it('should be able to update a customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const { id } = customer;

    expect(
      updateCustomer.execute({
        id,
        name: 'newName',
        email: 'email.teste@email.com',
      }),
    ).toBeTruthy();
  });

  it('should not be able to update a customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository);

    await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const id = 'sadasdad-9344-123-123123';

    expect(
      updateCustomer.execute({
        id,
        name: 'newName',
        email: 'email.teste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email of customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const alreadyEmailExistscustomer = await createCustomer.execute({
      name: 'Teste Email',
      email: 'emailexists@email.com',
    });

    const { email } = alreadyEmailExistscustomer;

    const { id } = customer;

    expect(
      updateCustomer.execute({
        id,
        name: 'newName',
        email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
