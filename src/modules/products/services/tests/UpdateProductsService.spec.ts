import 'reflect-metadata';
import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppErrors';
import UpdateProductService from '../UpdateProductService';

let fakeRepository: FakeProductRepository;
let updateProduct: UpdateProductService;

describe('Update Prodcuts', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductRepository();
    updateProduct = new UpdateProductService(fakeRepository);
  });
  it('should be able to update a product', async () => {
    const product = await fakeRepository.create({
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
    await fakeRepository.create({
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
    await fakeRepository.create({
      name: 'NameExists',
      price: 99.9,
      quantity: 9,
    });

    const newProduct = await fakeRepository.create({
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
