import React, { 
  FC,
  ReactElement, 
} from 'react';

import styled from 'styled-components';

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

const FormWrapper = styled.div`
  border: 1px solid black;
  margin: 10px 0;
  padding: 5px;
`;

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
    
    let itemInput: ReactElement;

    const props = {
      disabled: true,
      label: key,
      value: field,
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
        itemInput = <DateField {...props} value={new Date(field)} />;
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
    <FormWrapper>
      {fields}
    </FormWrapper>
  );
};
