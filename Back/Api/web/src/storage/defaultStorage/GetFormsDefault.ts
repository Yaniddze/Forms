import { Form } from '../../domain';
import { GetForms, StorageAnswer } from '../types';

export class GetFormsDefault implements GetForms {
  Handle(count: number, offset: number): Promise<StorageAnswer<Form[]>> {
    throw new Error('Get forms is not provided');
  }

  Cancel(): void {
    throw new Error('Get forms is not provided');
  }
}
