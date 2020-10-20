import { 
  AvalibleTypes,
  BooleanFieldTypeTitle,
  DateFieldTypeTitle,
  NumberFieldTypeTitle,
  TextFieldTypeTitle,
  RadioFieldTypeTitle,
  ManySelect,
} from './types';

export function GetFieldType(value: any): AvalibleTypes {
  if (typeof value === 'boolean') return { title: BooleanFieldTypeTitle };
  if (typeof value === 'number') return { title: NumberFieldTypeTitle };
  if (typeof value === 'string') return { title: TextFieldTypeTitle };
  if (value instanceof Date) return { title: DateFieldTypeTitle };
  if (value instanceof ManySelect) return { title: RadioFieldTypeTitle };

  return { title: TextFieldTypeTitle };
}
