import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
  AxiosError,
} from 'axios';

import { GetForms, StorageAnswer } from '../types';
import { CreateClient } from '../../configuration';
import { Form } from '../../domain';

export class GetFormsAxios implements GetForms {
  constructor() {
    const { httpClient, canceler } = CreateClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosGetForms_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Handle(count: number, offset: number): Promise<StorageAnswer<Form[]>> {
    return this.httpClient.get(`/get?Count=${count}&Offset=${offset}`)
      .then((result: AxiosResponse<StorageAnswer<Form[]>>) => ({
        ...result.data,
        data: result.data.data.map((form) => ({
          ...form,
          fields: JSON.parse(form.fields as any),
        })),
      }))
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
