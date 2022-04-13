import { Schema, Document } from 'mongoose';
import { Car as ICar } from '../interfaces/CarInterface';

interface CarDocument extends ICar, Document {}
const CarSchema = new Schema<CarDocument>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  }, 
  { versionKey: false },
);

export default CarSchema;