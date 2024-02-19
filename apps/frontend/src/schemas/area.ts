import { z } from 'zod';

export const areaSchema = z
  .object({
    placeId: z.string().min(1, 'Place ID is required'),
    mainText: z.string().min(1, 'Field is required'),
    secondaryText: z.string().nullable(),
  })
  .required();
