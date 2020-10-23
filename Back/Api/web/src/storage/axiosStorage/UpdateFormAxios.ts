import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
  AxiosError,
} from 'axios';

import { UpdateForm, StorageAnswer } from '../types';
import { CreateClient } from '../../configuration';
import { Form } from '../../domain';

export class UpdateFormAxios implements UpdateForm {
  constructor() {
    const { httpClient, canceler } = CreateClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosUpdateForm_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Handle(form: Form): Promise<StorageAnswer<Form>> {
    return this.httpClient.patch('/update', form)
      .then((result: AxiosResponse<StorageAnswer<Form>>) => result.data)
      .catch((e: AxiosError) => {
        if (e.message === this.cancellationWord) {
          return {
            success: false,
            errors: [''],
            data: {
              id: '',
              fields: {},
            },
          };
        }

        return {
          success: false,
          errors: ['Network error'],
          data: {
            id: '',
            fields: {},
          },
        };
      });
  }

  Cancel(): void {
    if (this.canceler !== undefined) {
      this.canceler(this.cancellationWord);
    }
  }
}
