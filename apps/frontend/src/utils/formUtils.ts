import { PropertyType } from '../interfaces';
import { PropertyData } from '../pages/Form/schema';

export const prepareInitialValueData = (property?: PropertyData) => {
  return {
    title: property?.title ?? '',
    type: property?.type ?? PropertyType.SELECT,
    area: property?.area ?? '',
    price: property?.price ?? '',
    description: property?.description ?? '',
  };
};
