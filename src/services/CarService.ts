import CarModel from '../models/CarsModel';
import CarSchemaZod, { Car as ICar } from '../interfaces/CarInterface';
// import GenericService, { ServiceError } from './GenericServices';
import GenericService from './GenericServices';

export default class CarService extends GenericService<ICar> {
  constructor(public model = new CarModel()) {
    super(model, CarSchemaZod);
  }

  // create = async (obj: ICar): Promise<ICar | ServiceError | null> => {
  //   const parsed = CarSchemaZod.safeParse(obj);
  //   if (!parsed.success) {
  //     return { error: parsed.error };
  //   }
  //   return this.model.create(obj);
  // };

  // update = async (
  //   id: string,
  //   obj: ICar,
  // ): Promise<ICar | ServiceError | null> => {
  //   const parsed = CarSchemaZod.safeParse(obj);
  //   if (!parsed.success) {
  //     return { error: parsed.error };
  //   }
  //   const a = this.model.update(id, obj);
  //   console.log({ a });
  //   return a;
  // };
}