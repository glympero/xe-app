import { z } from 'zod';
import { propertySchema } from '../schemas/property';

export enum PropertyType {
  Select = 'Select type',
  Rent = 'Rent',
  Buy = 'Buy',
  Exchange = 'Exchange',
  Donation = 'Donation',
}

export type AutocompleteData = {
  placeId: string;
  mainText: string;
  secondaryText: string;
};

export type PropertyData = z.infer<typeof propertySchema>;
export type Property = PropertyData & { id: number };
