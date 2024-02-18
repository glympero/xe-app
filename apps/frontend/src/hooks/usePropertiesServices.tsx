import { useState } from 'react';
import ky from 'ky';
import { PROPERTIES_URL } from '@/App/constants';
import { PropertyData } from '@/App/interfaces';

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

  const handleAsyncEdit = async (data: PropertyData, id: number) => {
    setIsValidating(true);
    try {
      const res = await ky.patch(`${PROPERTIES_URL}/${id}`, {
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
    handleAsyncEdit,
  };
};
export default usePropertiesServices;