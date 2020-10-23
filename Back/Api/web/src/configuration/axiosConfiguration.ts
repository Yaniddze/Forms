import axios, { AxiosInstance, Canceler } from 'axios';
import { hostAddress } from './hostConfiguration';

type ReturnType = {
  httpClient: AxiosInstance;
  canceler: Canceler| undefined;
}

export function CreateClient(): ReturnType {
  let canceler: Canceler | undefined;

  const cancellation = new axios.CancelToken((c) => {
    canceler = c;
  });

  const httpClient = axios.create({
    baseURL: `${hostAddress}/api/v1`,
    cancelToken: cancellation,
  });

  return {
    httpClient,
    canceler,
  };
}
