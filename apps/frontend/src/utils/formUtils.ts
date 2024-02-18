import { PropertyType } from '../interfaces';
import { PropertyData } from '../pages/NewProperty/schema';

export const prepareInitialValueData = (property?: PropertyData) => {
  return {
    title: property?.title ?? '',
    type: property?.type ?? PropertyType.Select,
    area: property?.area ?? '',
    price: property?.price,
    description: property?.description ?? '',
  };
};
