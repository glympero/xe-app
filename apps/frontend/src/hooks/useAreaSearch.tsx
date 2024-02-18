import { PROXY_URL } from '../constants';
import { AutocompleteData } from '../interfaces';
import { useFetch } from './useFetch';

export const useUserSearch = (query: string) => {
  const { data, isValidating, error } = useFetch<AutocompleteData[]>({
    url: query.length >= 3 ? `${PROXY_URL}/${query}` : null,
    revalidateIfStale: false,
  });

  return {
    areas: data,
    isValidating,
    isError: error !== undefined,
  };
};
