import 'reflect-metadata';
import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import DeleteProductService from '../DeleteProductService';

let fakeRepository: FakeProductRepository;
let deleteProduct: DeleteProductService;

describe('Delete Product', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductRepository();
    deleteProduct = new DeleteProductService(fakeRepository);
  });
  it('should be able to delete a product', async () => {
    const product = await fakeRepository.create({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = product;

    expect(deleteProduct.execute({ id })).toBeTruthy();
  });

  it('should not be able to delete a product', async () => {
    await fakeRepository.create({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const id = 'dsada-231232-sadc21-eeqcq2';

    expect(deleteProduct.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
