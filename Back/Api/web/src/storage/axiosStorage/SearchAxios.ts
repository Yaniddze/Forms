import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
  AxiosError,
} from 'axios';

import { Search, StorageAnswer } from '../types';
import { CreateClient } from '../../configuration';
import { Form } from '../../domain';

export class SearchAxios implements Search {
  constructor() {
    const { httpClient, canceler } = CreateClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosSearch_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Handle(query: string, count: number, offset: number): Promise<StorageAnswer<Form[]>> {
    return this.httpClient.post('/search', {
      query, count, offset,
    })
      .then((result: AxiosResponse<StorageAnswer<Form[]>>) => result.data)
      .catch((e: AxiosError) => {
        if (e.message === this.cancellationWord) {
          return {
            success: false,
            errors: [''],
            data: [],
          };
        }

        return {
          success: false,
          errors: ['Network error'],
          data: [],
        };
      });
  }

  Cancel(): void {
    if (this.canceler !== undefined) {
      this.canceler(this.cancellationWord);
    }
  }
}
