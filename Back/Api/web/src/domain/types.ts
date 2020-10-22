export type Form = {
  id: string;
  fields: Record<string, unknown>;
}

export class ManySelect {
  values: string[] = [];

  selected: string[] = [];
}

export const BooleanFieldTitle = 'boolean';

export const NumberFieldTitle = 'number';

export const DateFieldTitle = 'date';

export const ManySelectTitle = 'many'; 

export const TextFieldTitle = 'text';

export type AvalibleTypes = 
  | typeof BooleanFieldTitle
  | typeof NumberFieldTitle
  | typeof DateFieldTitle
  | typeof ManySelectTitle
  | typeof TextFieldTitle;

export type TypeChecker = {
  type: AvalibleTypes,
  check: (value: any) => boolean;
};
