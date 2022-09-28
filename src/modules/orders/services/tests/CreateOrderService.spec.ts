import 'reflect-metadata';
import FakeOrdersRepository from '@modules/orders/domain/repositories/fakes/FakeOrdersRepository';
import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeProductsRepository: FakeProductRepository;
let createOrderService: CreateOrderService;

describe('Create Order', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeProductsRepository = new FakeProductRepository();
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeProductsRepository,
    );
  });

  it('should be able to create order', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'FakeCustomer',
      email: 'email.test@test.com',
    });

    const product = await fakeProductsRepository.create({
      name: 'testProduct',
      price: 99.9,
      quantity: 99,
    });

    const { id } = product;

    expect(
      createOrderService.execute({
        customer_id: customer.id,
        products: [],
      }),
    ).toBeTruthy();
  });
});
