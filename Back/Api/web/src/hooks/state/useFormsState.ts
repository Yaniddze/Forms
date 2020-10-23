import { 
  observable,
  action,
  makeObservable, 
} from 'mobx';
import { Form } from '../../domain/types';

class Storage {
  public Forms: Form[] = [];

  constructor() {
    makeObservable({
      forms: observable,
      setForms: action,
      addForm: action,
      deleteForm: action,
      updateForm: action,
    });
  }

  public setForms(forms: Form[]): void {
    this.Forms = forms;
  }

  public addForm(form: Form): void {
    this.Forms.push(form);
  }

  public deleteForm(id: string): void {
    this.Forms = this.Forms.filter((form) => form.id !== id);
  }

  public updateForm(form: Form): void {
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
  setForms: storage.setForms,
  addForm: storage.addForm,
  deleteForm: storage.deleteForm,
  updateForm: storage.updateForm,
});
