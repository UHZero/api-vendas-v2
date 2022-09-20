import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import CreateProductService from '../CreateProductService';
import UpdateProductService from '../UpdateProductService';

describe('Update Prodcuts', () => {
  it('should be able to update a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const updateProduct = new UpdateProductService(fakeRepository);

    const product = await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = product;

    expect(
      updateProduct.execute({
        id,
        name: 'NewProductName',
        price: 89.9,
        quantity: 6,
      }),
    ).toBeTruthy();
  });

  it('should not be able to update a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const updateProduct = new UpdateProductService(fakeRepository);

    await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const id = 'u4e56ue6-uue56ue56-eue6ue56ue56-u66eue5eu';

    expect(
      updateProduct.execute({
        id,
        name: 'NewProductName',
        price: 89.9,
        quantity: 6,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to use a same name for update a product', async () => {
    const fakeRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeRepository);
    const updateProduct = new UpdateProductService(fakeRepository);

    await createProduct.execute({
      name: 'NameExists',
      price: 99.9,
      quantity: 9,
    });

    const newProduct = await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });

    const { id } = newProduct;

    expect(
      updateProduct.execute({
        id,
        name: 'NameExists',
        price: 89.9,
        quantity: 6,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
