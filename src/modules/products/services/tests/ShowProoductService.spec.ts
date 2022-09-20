import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import CreateProductService from '../CreateProductService';
import ShowProductService from '../ShowProoductService';

describe('Show Product', () => {
  it('should be able to show a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const showProduct = new ShowProductService(fakeRepository);

    const product = await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = product;

    expect(showProduct.execute({ id })).toBeTruthy();
  });

  it('should not be able to show a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const showProduct = new ShowProductService(fakeRepository);

    await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const id = 'dasidjaid2131-21312cre13-23cqsq3f-312c324';

    expect(showProduct.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
