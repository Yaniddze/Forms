import { 
  observable,
  action,
  makeObservable, 
} from 'mobx';
import { Form } from '../../domain/types';

class Storage {
  public Forms: Form[] = [];

  constructor() {
    makeObservable(this, {
      Forms: observable,
      SetForms: action,
      AddForm: action,
      DeleteForm: action,
      UpdateForm: action,
    });
  }

  public SetForms(forms: Form[]): void {
    this.Forms = forms;
  }

  public AddForm(form: Form): void {
    this.Forms.push(form);
  }

  public DeleteForm(id: string): void {
    this.Forms = this.Forms.filter((form) => form.id !== id);
  }

  public UpdateForm(form: Form): void {
    this.Forms = this.Forms.map((mappedForm) => {
      if (mappedForm.id === form.id) {
        return form;
      }

      return mappedForm;
    });
  }
}

const storage = new Storage();

type ReturnType = {
  forms: Form[];
  setForms: (forms: Form[]) => void;
  addForm: (form: Form) => void;
  deleteForm: (id: string) => void;
  updateForm: (form: Form) => void; 
}

export const useFormsState = (): ReturnType => ({
  forms: storage.Forms,
  setForms: storage.SetForms.bind(storage),
  addForm: storage.AddForm.bind(storage),
  deleteForm: storage.DeleteForm.bind(storage),
  updateForm: storage.UpdateForm.bind(storage),
});
