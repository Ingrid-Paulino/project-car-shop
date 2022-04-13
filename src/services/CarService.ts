import CarModel from '../models/CarsModel';
import CarSchemaZod, { Car as ICar } from '../interfaces/CarInterface';
import GenericService, { ServiceError } from './GenericServices';

export default class CarService extends GenericService<ICar> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  create = async (obj: ICar): Promise<ICar | ServiceError | null> => {
    const parsed = CarSchemaZod.safeParse(obj);
    if (!parsed.success) {
      console.log('oiiii');
      
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}