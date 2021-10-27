import { User, UserStore } from '../user';
const store = new UserStore();

function delayFunction() {
  return new Promise(function(resolve) {
    setTimeout(resolve, 3000);
  });
}
describe('User Model', () => {
  const newUser: User = {
    first_name: 'testUser',
    last_name: 'last_name',
    password: 'testPassword'
  };
  const createdUser = { ...newUser, id: 1 };
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create(newUser);
    expect(result.first_name).toEqual(createdUser.first_name);
    expect(result.last_name).toEqual(createdUser.last_name);
    expect(result.id).toEqual(createdUser.id);
    await delayFunction();
  });

  it('index method should return a list of users', async () => {
    await delayFunction();
    const result = await store.index();
    expect(result.length).toBe(1);
    expect(result[0].first_name).toEqual(createdUser.first_name);
    expect(result[0].last_name).toEqual(createdUser.last_name);
    expect(result[0].id).toEqual(createdUser.id);
  });

  it('show method should return the correct user', async () => {
    await delayFunction();
    const result = await store.show('1');
    expect(result.first_name).toEqual(createdUser.first_name);
    expect(result.last_name).toEqual(createdUser.last_name);
    expect(result.id).toEqual(createdUser.id);
  });

  it('delete method should remove the user', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
