import React, { 
  FC,
  ReactElement, 
} from 'react';

import { 
  Form, 
  GetFieldType,
  BooleanFieldTitle,
  DateFieldTitle,
  ManySelectTitle,
  NumberFieldTitle,
  TextFieldTitle, 
} from '../domain';

import {
  TextField,
  BooleanField,
  ManySelectField,
  NumberField,
  DateField,
} from './fields';

type PropTypes = {
  children?: never;
  item: Form;
}

export const FormShow: FC<PropTypes> = (
  { item }: PropTypes,
) => {
  const keys = Object.keys(item.fields);

  const fields = keys.map((key) => {
    const field: any = item.fields[key];
    const fieldType = GetFieldType(field);
    
    let itemInput: ReactElement = <div />;

    const props = {
      disabled: true,
      value: field,
      label: key,
      onChange: (newValue: any) => {
        console.log(newValue);
      },
    };

    switch (fieldType) {
      case BooleanFieldTitle:
        itemInput = <BooleanField {...props} />;
        break;
      
      case TextFieldTitle:
        itemInput = <TextField {...props} />;
        break;

      case DateFieldTitle:
        itemInput = <DateField {...props} />;
        break;

      case ManySelectTitle:
        itemInput = <ManySelectField {...props} />;
        break;

      case NumberFieldTitle:
        itemInput = <NumberField {...props} />;
        break;
      
      default:
        itemInput = <TextField {...props} />;
    }

    return (
      <div>
        {itemInput}
      </div>
    );
  });

  return (
    <div>
      {fields}
    </div>
  );
};
