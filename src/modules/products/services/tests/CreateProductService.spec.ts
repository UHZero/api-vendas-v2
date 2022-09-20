import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import CreateProductService from '../CreateProductService';

describe('Create Product', () => {
  it('should be able to create a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);

    const product = await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });
    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);

    await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    expect(
      createProduct.execute({
        name: 'Teste',
        price: 99.9,
        quantity: 9,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
