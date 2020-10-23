import { Form } from '../../domain';
import { Search, StorageAnswer } from '../types';

export class SearchDefault implements Search {
  Handle(query: string, count: number, offset: number): Promise<StorageAnswer<Form[]>> {
    throw new Error('Search is not provided');
  }

  Cancel(): void {
    throw new Error('Search is not provided');
  }
}
