export interface IBotRepository {
  findOne(id: number): Promise<undefined>;
}
