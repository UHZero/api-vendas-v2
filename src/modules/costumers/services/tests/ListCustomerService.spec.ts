import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from '../CreateCustomerService';
import ListCustomersService from '../ListCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let listCustomer: ListCustomersService;

describe('List Service', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
    listCustomer = new ListCustomersService(fakeCustomerRepository);
  });
  it('should be able to list a customer', async () => {
    await createCustomer.execute({
      name: 'Teste Name',
      email: 'emailteste@email.com',
    });

    expect(listCustomer.execute()).toBeTruthy();
  });
});
