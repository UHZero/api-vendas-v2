import 'reflect-metadata';
import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import ListCustomersService from '../ListCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let listCustomer: ListCustomersService;

describe('List Service', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    listCustomer = new ListCustomersService(fakeCustomerRepository);
  });
  it('should be able to list a customer', async () => {
    await fakeCustomerRepository.create({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    expect(listCustomer.execute()).toBeTruthy();
  });
});
