import 'reflect-metadata';
import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppErrors';
import UpdateCustomerService from '../UpdateCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;

describe('Update Customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    updateCustomer = new UpdateCustomerService(fakeCustomerRepository);
  });
  it('should be able to update a customer', async () => {
    const customer = await fakeCustomerRepository.create({
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
    await fakeCustomerRepository.create({
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
    const customer = await fakeCustomerRepository.create({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const alreadyEmailExistscustomer = await fakeCustomerRepository.create({
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
