// import mongoose from 'mongoose';
import { model as createModel } from 'mongoose';

import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';
import CarSchema from '../schemas/carSchema';

class CarModel extends GenericModel<Car> {
  // constructor(public model = mongoode.model
  constructor(public model = createModel('cars', CarSchema)) {
    super(model);
  }
}

export default CarModel;