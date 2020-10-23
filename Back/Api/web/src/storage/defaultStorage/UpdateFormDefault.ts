import { Form } from '../../domain';
import { UpdateForm, StorageAnswer } from '../types';

export class UpdateFormDefault implements UpdateForm {
  Handle(form: Form): Promise<StorageAnswer<Form>> {
    throw new Error('Update form is not provided');
  }

  Cancel(): void {
    throw new Error('Update form is not provided');
  }
}
