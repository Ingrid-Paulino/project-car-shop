import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { message: 'Color must be 3 or more characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  })
    .lte(2022, { message: 'Year must be less than 2022' })
    .gte(1900, { message: 'Year must be greater than 1900' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type Vehicle = z.infer<typeof VehicleSchema>;

export { VehicleSchema, Vehicle };