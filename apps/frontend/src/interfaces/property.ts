import { z } from 'zod';
import { propertySchema } from '@/App/schemas/property';

export enum PropertyType {
  Select = 'Select type',
  Rent = 'Rent',
  Buy = 'Buy',
  Exchange = 'Exchange',
  Donation = 'Donation',
}

export type PropertyData = z.infer<typeof propertySchema>;
export type Property = PropertyData & { id: number };
