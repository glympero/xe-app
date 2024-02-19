import * as z from 'zod';
import { PropertyType } from '../interfaces';

export const propertySchema = z
  .object({
    title: z.string().min(1, 'Field is required').max(155),
    type: z.nativeEnum(PropertyType).superRefine((value, ctx) => {
      if (value === PropertyType.Select) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Field is required',
        });
      }
      return true;
    }),
    area: z.string().min(1, 'Field is required'),
    price: z
      .string()
      .min(1, 'Field is required')
      .superRefine((value, ctx) => {
        const valueNumber = Number(value);
        if (isNaN(valueNumber) || valueNumber <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid number greater than 0',
          });
        }
        return true;
      }),
    description: z.string().optional(),
  })
  .required();
