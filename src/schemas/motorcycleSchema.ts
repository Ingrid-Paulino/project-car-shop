import { Schema, Document } from 'mongoose';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';

export interface MotorcycleDocument extends IMotorcycle, Document {}
const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: Boolean,
  buyValue: { type: Number, required: true },
  category: { type: Object as never, required: true },
  engineCapacity: { type: Number, required: true },
}, { versionKey: false });

export default MotorcycleSchema;