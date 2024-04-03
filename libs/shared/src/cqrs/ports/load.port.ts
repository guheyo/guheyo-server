export interface LoadPort<T> {
  findById(id: string): Promise<T | null>;
}
