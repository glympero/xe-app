import { PropertyData, PropertyType } from '../interfaces';

export const prepareInitialValueData = (property?: PropertyData) => {
  return {
    title: property?.title ?? '',
    type: property?.type ?? PropertyType.Select,
    area: property?.area ?? {
      placeId: '',
      mainText: '',
      secondaryText: '',
    },
    price: property?.price.toString() ?? '',
    description: property?.description ?? '',
  };
};
