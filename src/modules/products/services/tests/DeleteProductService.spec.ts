import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import CreateProductService from '../CreateProductService';
import DeleteProductService from '../DeleteProductService';

describe('Delete Product', () => {
  it('should be able to delete a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const deleteProduct = new DeleteProductService(fakeRepository);

    const product = await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = product;

    expect(deleteProduct.execute({ id })).toBeTruthy();
  });

  it('should not be able to delete a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const deleteProduct = new DeleteProductService(fakeRepository);

    await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const id = 'dsada-231232-sadc21-eeqcq2';

    expect(deleteProduct.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
