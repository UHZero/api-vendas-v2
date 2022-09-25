import 'reflect-metadata';
import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import ListProductService from '../ListProductService';

let fakeRepository: FakeProductRepository;
let listProduct: ListProductService;

describe('List Product', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductRepository();
    listProduct = new ListProductService(fakeRepository);
  });
  it('should be able list products if available', async () => {
    await fakeRepository.create({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });
    expect(listProduct.execute()).toBeTruthy();
  });
});
