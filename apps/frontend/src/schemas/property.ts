import * as z from 'zod';
import { PropertyType } from '../interfaces';
import { areaSchema } from './area';

export const propertySchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(155),
    type: z.nativeEnum(PropertyType).superRefine((value, ctx) => {
      if (value === PropertyType.Select) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Type is required',
        });
      }
      return true;
    }),
    area: areaSchema.superRefine((value, ctx) => {
      if (!value.placeId || !value.mainText) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Area is required',
        });
      }
      return true;
    }),
    price: z
      .string()
      .min(1, 'Price is required')
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
