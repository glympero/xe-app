import * as z from 'zod';
import { PropertyType } from '../../interfaces';

export const propertySchema = z
  .object({
    title: z.string().min(1).max(155),
    type: z.nativeEnum(PropertyType).superRefine((value, ctx) => {
      if (value === PropertyType.Select) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select a type',
        });
      }
      return true;
    }),
    area: z.string().min(1),
    price: z.number().superRefine((value, ctx) => {
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

export type PropertyData = z.infer<typeof propertySchema>;
export type Property = PropertyData & { id: number };
