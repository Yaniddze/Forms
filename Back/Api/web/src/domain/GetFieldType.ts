import { AvalibleTypes, TextFieldTitle } from './types';
import { TypeCheckers } from './TypeCheckers';

export function GetFieldType(value: any): AvalibleTypes {
  for (let index = 0; index < TypeCheckers.length; index++) {
    const { check, type } = TypeCheckers[index];
    
    if (check(value)) return type;
  }

  return TextFieldTitle;
}
