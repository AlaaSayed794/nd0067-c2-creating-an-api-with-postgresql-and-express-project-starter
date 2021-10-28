import { User, UserStore } from '../user';
const uStore = new UserStore();

describe('User Model', () => {
  const newUser: User = {
    user_name: 'newUser123',
    first_name: 'testUser',
    last_name: 'last_name',
    password: 'testPassword'
  };
  const createdUser = { ...newUser, id: 1 };
  it('should have an index method', () => {
    expect(uStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(uStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(uStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(uStore.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await uStore.create(newUser);
    expect(result.user_name).toEqual(createdUser.user_name);
    expect(result.first_name).toEqual(createdUser.first_name);
    expect(result.last_name).toEqual(createdUser.last_name);
    expect(result.id).toEqual(createdUser.id);
  });

  it('index method should return a list of users', async () => {
    const result = await uStore.index();
    expect(result.length).toBe(1);
    expect(result[0].user_name).toEqual(createdUser.user_name);
    expect(result[0].first_name).toEqual(createdUser.first_name);
    expect(result[0].last_name).toEqual(createdUser.last_name);
    expect(result[0].id).toEqual(createdUser.id);
  });

  it('show method should return the correct user', async () => {
    const result = await uStore.show('1');
    expect(result.user_name).toEqual(createdUser.user_name);
    expect(result.first_name).toEqual(createdUser.first_name);
    expect(result.last_name).toEqual(createdUser.last_name);
    expect(result.id).toEqual(createdUser.id);
  });

  it('delete method should remove the user', async () => {
    uStore.delete('1');
    const result = await uStore.index();

    expect(result).toEqual([]);
  });
});
