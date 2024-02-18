import React from 'react';
import { SWRConfiguration, SWRConfig } from 'swr';
import { fetcher } from '@/App/hooks/useFetch';

export interface SWRProviderProps {
  swrConfig?: SWRConfiguration;
}
export const SWRProvider: React.FC<
  React.PropsWithChildren<SWRProviderProps>
> = ({ swrConfig, ...props }) => {
  return <SWRConfig {...props} value={{ ...swrConfig, fetcher }} />;
};
