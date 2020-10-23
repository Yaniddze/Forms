import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
  AxiosError,
} from 'axios';

import { DeleteForm, StorageAnswer } from '../types';
import { CreateClient } from '../../configuration';

export class DeleteFormAxios implements DeleteForm {
  constructor() {
    const { httpClient, canceler } = CreateClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosDeleteForm_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Handle(id: string): Promise<StorageAnswer<string>> {
    return this.httpClient.delete(`/create?Id=${id}`)
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
