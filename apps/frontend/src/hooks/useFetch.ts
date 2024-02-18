import useSWR, { KeyedMutator } from 'swr';

export type ApiError = {
  message: string;
  error: string;
  statusCode: number;
};

export interface IReturnedData<T> {
  data?: T;
  error?: ApiError;
  isValidating: boolean;
  mutate: KeyedMutator<T>;
}

export type FetcherType = <T = unknown>(
  url: string,
  init: RequestInit
) => Promise<T>;

export const fetcher: FetcherType = async (url: string, init = {}) => {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};

interface IFetchOptions {
  url: string | null;
  fetcherType?: FetcherType;
  revalidateIfStale?: boolean;
}

export const useFetch = <FetchedData>(
  config: IFetchOptions
): IReturnedData<FetchedData> => {
  const { url, fetcherType = fetcher, revalidateIfStale = true } = config;

  const { data, error, isValidating, mutate } = useSWR<FetchedData>(
    url ? url : null,
    fetcherType,
    {
      revalidateIfStale: revalidateIfStale,
      suspense: false,
    }
  );
  return { data, error, isValidating, mutate };
};
