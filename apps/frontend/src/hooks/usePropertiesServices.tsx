import { useState } from 'react';
import ky from 'ky';
import { PROPERTIES_URL } from '../constants';
import { PropertyData } from '../interfaces';
import { ApiError } from './useFetch';

const usePropertiesServices = () => {
  const [isValidating, setIsValidating] = useState(false);

  const handleAsyncSubmit = async (data: PropertyData) => {
    setIsValidating(true);
    try {
      await ky.post(`${PROPERTIES_URL}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        res: true,
      };
    } catch (error) {
      return {
        res: false,
        error: error as ApiError,
      };
    } finally {
      setIsValidating(false);
    }
  };

  const handleAsyncEdit = async (data: PropertyData, id: number) => {
    setIsValidating(true);
    try {
      await ky.patch(`${PROPERTIES_URL}/${id}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        res: true,
      };
    } catch (error) {
      return {
        res: false,
        error: error as ApiError,
      };
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
