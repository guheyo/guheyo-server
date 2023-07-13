export interface IUserService {
  findOne(userId: number): Promise<number>;
}
