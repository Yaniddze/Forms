export type Form = {
  id: string;
  fields: Record<string, unknown>;
}

export class RadioField {
  public values: string[];

  public selected: string[];

  constructor(values: string[], selected: string[]) {
    this.selected = selected;
    this.values = values;
  }
}

export const BooleanFieldTypeTitle = 'boolean';

type BooleanFieldType = {
  title: typeof BooleanFieldTypeTitle;
};

export const NumberFieldTypeTitle = 'number';

type NumberFieldType = {
  title: typeof NumberFieldTypeTitle;
};

export const DateFieldTypeTitle = 'date';

type DateFieldType = {
  title: typeof DateFieldTypeTitle;
};

export const RadioFieldTypeTitle = 'radio'; 

type RadioFieldType = {
  title: typeof RadioFieldTypeTitle;
};

export const TextFieldTypeTitle = 'text';

type TextFieldType = {
  title: typeof TextFieldTypeTitle;
};

export type AvalibleTypes = 
  | BooleanFieldType
  | NumberFieldType
  | DateFieldType
  | RadioFieldType
  | TextFieldType;
