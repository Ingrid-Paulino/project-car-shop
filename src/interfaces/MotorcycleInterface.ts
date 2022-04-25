import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500).gte(1),
});

export type Motorcycle = z.infer<typeof MotorcycleSchema>;
export default MotorcycleSchema;