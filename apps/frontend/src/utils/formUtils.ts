import { PropertyData, PropertyType } from '@/App/interfaces';

export const prepareInitialValueData = (property?: PropertyData) => {
  return {
    title: property?.title ?? '',
    type: property?.type ?? PropertyType.Select,
    area: property?.area ?? '',
    price: property?.price,
    description: property?.description ?? '',
  };
};
