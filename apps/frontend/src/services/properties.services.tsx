import { useState } from 'react';
import { PropertyData } from '../pages/NewProperty/schema';
import ky from 'ky';
import { PROPERTIES_URL } from '../constants';

const usePropertiesServices = () => {
  const [isValidating, setIsValidating] = useState(false);

  const handleAsyncSubmit = async (data: PropertyData) => {
    setIsValidating(true);
    try {
      const res = await ky.post(`${PROPERTIES_URL}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  return {
    isValidating,
    handleAsyncSubmit,
  };
};
export default usePropertiesServices;
