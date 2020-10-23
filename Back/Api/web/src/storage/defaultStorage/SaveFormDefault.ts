import { SaveForm, StorageAnswer } from '../types';

export class SaveFormDefault implements SaveForm {
  Handle(fields: Record<string, unknown>): Promise<StorageAnswer<string>> {
    throw new Error('Save form is not provided');
  }

  Cancel(): void {
    throw new Error('Save form is not provided');
  }
}
