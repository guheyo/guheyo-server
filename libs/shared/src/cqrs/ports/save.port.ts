export interface SavePort<T> {
  create(entity: T): Promise<void>;
  save(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
