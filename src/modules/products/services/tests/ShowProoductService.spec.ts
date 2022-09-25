import 'reflect-metadata';
import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import ShowProductService from '../ShowProoductService';

let fakeRepository: FakeProductRepository;
let showProduct: ShowProductService;

describe('Show Product', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductRepository();
    showProduct = new ShowProductService(fakeRepository);
  });
  it('should be able to show a product', async () => {
    const product = await fakeRepository.create({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = product;

    expect(showProduct.execute({ id })).toBeTruthy();
  });

  it('should not be able to show a product', async () => {
    await fakeRepository.create({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const id = 'dasidjaid2131-21312cre13-23cqsq3f-312c324';

    expect(showProduct.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
