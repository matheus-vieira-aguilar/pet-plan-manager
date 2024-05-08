export default interface IService<T> {
  create(user: T): Promise<T>;

  list(): Promise<T[]>;

  listBy(condition: object): Promise<T[]>;

  update(id: string, data: T): Promise<T>;

  delete(id: string): Promise<T>;
}
