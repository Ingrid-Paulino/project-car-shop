import { ZodError, z } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

class GenericService<T> {
// abstract class GenericService<T> {
  constructor(
    public model: Model<T>,
    public schema: z.ZodObject<z.ZodRawShape>,
  ) {}

  // pq tenho que colocar public
  // constructor(protected model: Model<T>) {}

  // public async create(obj: T): Promise<T | null | ServiceError> {
  //   return this.model.create(obj);
  // }

  create = async (
    obj: T,
  ): Promise<T | ServiceError | null> => {
    const parsed = this.schema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  // public async update(
  //   id: string,
  //   obj: object,
  // ): Promise<T | null | ServiceError> {
  //   return this.model.update(id, obj);
  // }

  update = async (
    id: string,
    obj: object,
  ): Promise<T | ServiceError | null> => {
    const parsed = this.schema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const a = this.model.update(id, obj);
    return a;
  };

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}

export default GenericService;