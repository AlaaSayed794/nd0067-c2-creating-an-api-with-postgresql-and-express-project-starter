import { Product, ProductStore } from '../product';

const pStore = new ProductStore();

describe('Product Model', () => {
  const newProduct: Product = {
    name: 'new product',
    price: 100
  };
  const createdProduct = { ...newProduct, id: 1 };
  it('should have an index method', () => {
    expect(pStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(pStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(pStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(pStore.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await pStore.create(newProduct);
    expect(result.name).toEqual(createdProduct.name);
    expect(result.price).toEqual(createdProduct.price);
    expect(result.id).toEqual(createdProduct.id);
  });

  it('index method should return a list of products', async () => {
    const result = await pStore.index();
    expect(result.length).toBe(1);
    expect(result[0].name).toEqual(createdProduct.name);
    expect(result[0].price).toEqual(createdProduct.price);
    expect(result[0].id).toEqual(createdProduct.id);
  });

  it('show method should return the correct product', async () => {
    const result = await pStore.show('1');
    expect(result.name).toEqual(createdProduct.name);
    expect(result.price).toEqual(createdProduct.price);
    expect(result.id).toEqual(createdProduct.id);
  });

  it('delete method should remove the product', async () => {
    pStore.delete('1');
    const result = await pStore.index();

    expect(result).toEqual([]);
  });
});
