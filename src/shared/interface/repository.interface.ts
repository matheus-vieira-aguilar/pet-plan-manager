export default interface IRepository<T> {
  findAll(): Promise<T[]>;

  findOne(id: string): Promise<T>;

  findOneBy(by: object): Promise<T>;

  findBy(by: object): Promise<T[]>;

  create(dto: any): Promise<T>;

  update(id: string, updateUserDto: any): Promise<T>;

  remove(id: string): Promise<T>;
}
