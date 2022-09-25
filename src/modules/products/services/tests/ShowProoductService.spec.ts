import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import CreateProductService from '../CreateProductService';
import ShowProductService from '../ShowProoductService';

let fakeRepository: FakeProductRepository;
let createProduct: CreateProductService;
let showProduct: ShowProductService;

describe('Show Product', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductRepository();
    createProduct = new CreateProductService(fakeRepository);
    showProduct = new ShowProductService(fakeRepository);
  });
  it('should be able to show a product', async () => {
    const product = await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = product;

    expect(showProduct.execute({ id })).toBeTruthy();
  });

  it('should not be able to show a product', async () => {
    await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const id = 'dasidjaid2131-21312cre13-23cqsq3f-312c324';

    expect(showProduct.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
