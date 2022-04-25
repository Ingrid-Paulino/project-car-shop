// import { z } from 'zod';

import MotorcycleModel from '../models/MotorcyclesModel';

import MotorcycleSchema, {
  Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
// import GenericService, { ServiceError } from './GenericServices';
import GenericService from './GenericServices';

export default class MotorcycleService extends GenericService<IMotorcycle> {
  constructor(public model = new MotorcycleModel()) {
    super(model, MotorcycleSchema);
  }

  // create = async (
  //   obj: IMotorcycle,
  //   schema: z.ZodObject<z.ZodRawShape>,
  // ): Promise<IMotorcycle | ServiceError | null> => {
  //   const parsed = schema.safeParse(obj);
  //   if (!parsed.success) {
  //     return { error: parsed.error };
  //   }
  //   return this.model.create(obj);
  // };

  // update = async (
  //   id: string,
  //   obj: IMotorcycle,
  // ): Promise<IMotorcycle | ServiceError | null> => {
  //   const parsed = MotorcycleSchema.safeParse(obj);
  //   if (!parsed.success) {
  //     return { error: parsed.error };
  //   }
  //   const a = this.model.update(id, obj);
  //   console.log({ a });
  //   return a;
  // };
}