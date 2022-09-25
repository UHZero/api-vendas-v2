import 'reflect-metadata';
import AppError from '@shared/errors/AppErrors';
import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from '../ShowCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;

describe('Show Customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    showCustomer = new ShowCustomerService(fakeCustomerRepository);
  });
  it('should be able show a customer', async () => {
    const customer = await fakeCustomerRepository.create({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const { id } = customer;

    expect(showCustomer.execute({ id })).toBeTruthy();
  });

  it('should not be able to show a customer', async () => {
    await fakeCustomerRepository.create({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    const id = 'i23i3u2v4-12312kj3v-21v2v1-23v1v23';

    expect(showCustomer.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
