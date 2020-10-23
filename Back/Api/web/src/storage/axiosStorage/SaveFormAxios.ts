import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
  AxiosError,
} from 'axios';

import { SaveForm, StorageAnswer } from '../types';
import { CreateClient } from '../../configuration';

export class SaveFormAxios implements SaveForm {
  constructor() {
    const { httpClient, canceler } = CreateClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosSaveForm_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Handle(fields: Record<string, unknown>): Promise<StorageAnswer<string>> {
    return this.httpClient.put('/create', { ...fields })
      .then((result: AxiosResponse<StorageAnswer<string>>) => result.data)
      .catch((e: AxiosError) => {
        if (e.message === this.cancellationWord) {
          return {
            success: false,
            errors: [''],
            data: '',
          };
        }

        return {
          success: false,
          errors: ['Network error'],
          data: '',
        };
      });
  }

  Cancel(): void {
    if (this.canceler !== undefined) {
      this.canceler(this.cancellationWord);
    }
  }
}
