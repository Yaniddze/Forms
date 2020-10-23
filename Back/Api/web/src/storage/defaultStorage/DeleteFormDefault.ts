import { DeleteForm, StorageAnswer } from '../types';

export class DeleteFormDefault implements DeleteForm {
  Handle(id: string): Promise<StorageAnswer<string>> {
    throw new Error('Delete form is not provided');
  }

  Cancel(): void {
    throw new Error('Delete form is not provided');
  }
}
