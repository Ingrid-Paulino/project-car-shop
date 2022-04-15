import { Schema, Document } from 'mongoose';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';

interface MotorcycleDocument extends IMotorcycle, Document {}
const CarSchema = new Schema<MotorcycleDocument>(
  {
    category: { type: Array<String>, required: true },
    engineCapacity: 
  { versionKey: false },
);

export default CarSchema;