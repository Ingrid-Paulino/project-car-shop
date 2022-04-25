import { model as createModel } from 'mongoose';

import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import GenericModel from './GenericModel';
import MotorcycleSchema from '../schemas/motorcycleSchema';

class MotorcycleModel extends GenericModel<IMotorcycle> {
  constructor(public model = createModel('motorcycles', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;