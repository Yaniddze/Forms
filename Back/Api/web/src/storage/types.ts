import { Form } from '../domain';

export type StorageAnswer<TData> = {
  success: boolean;
  errors: string[];
  data: TData;
}

export interface SaveForm {
  Handle(fields: Record<string, unknown>): Promise<StorageAnswer<string>>;
  Cancel(): void;
}

export interface UpdateForm {
  Handle(form: Form): Promise<StorageAnswer<Form>>;
  Cancel(): void;
}

export interface DeleteForm {
  Handle(id: string): Promise<StorageAnswer<string>>;
  Cancel(): void;
}

export interface GetForms {
  Handle(count: number, offset: number): Promise<StorageAnswer<Form[]>>;
  Cancel(): void;
}

export interface Search {
  Handle(query: string, count: number, offset: number): Promise<StorageAnswer<Form[]>>;
  Cancel(): void;
}
