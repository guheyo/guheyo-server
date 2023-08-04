export interface IUserRepository {
  findOne(userId: number): Promise<number>;
}
