import FakeProductRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import ListProductService from '../ListProductService';

let fakeRepository: FakeProductRepository;
let createProduct: CreateProductService;
let listProduct: ListProductService;

describe('List Product', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductRepository();
    createProduct = new CreateProductService(fakeRepository);
    listProduct = new ListProductService(fakeRepository);
  });
  it('should be able list products if available', async () => {
    await createProduct.execute({
      name: 'Teste',
      price: 99.9,
      quantity: 9,
    });
    expect(listProduct.execute()).toBeTruthy();
  });
});
