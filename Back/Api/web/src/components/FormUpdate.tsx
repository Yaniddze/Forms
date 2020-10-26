// Core
import React, { 
  FC, 
  ReactElement, 
  useState,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

// Domain
import { 
  GetFieldType,
  Form as FormType, 
  ManySelect,  
  BooleanFieldTitle,
  DateFieldTitle,
  TextFieldTitle,
  ManySelectTitle,
  NumberFieldTitle,
} from '../domain';

// Field components
import { 
  BooleanField, 
  DateField,
  NumberField,
  TextField,
  ManySelectField,
} from './fields';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;

  > div {
    margin: 0 auto;
  }
`; 

const ButtonHolder = styled.div`
  display: flex;

  > button {
    margin-left: auto;
  }
`;

type PropTypes = {
  children?: never;
  item: FormType;
  onSubmit: (form: FormType) => void;
  buttonText: string;
}

export const FormUpdate: FC<PropTypes> = (
  { item, onSubmit, buttonText }: PropTypes,
) => {
  const keys = Object.keys(item.fields);
  const initialObject: any = {};

  keys.forEach((key) => {
    initialObject[key] = item.fields[key];
  });

  const [values, setValues] = useState(initialObject);

  const handleSubmit = (e: MouseEvent): void => {
    e.preventDefault();

    onSubmit({
      id: item.id,
      fields: values,
    });
  };

  const inputs = keys.map((key) => {
    const field: any = item.fields[key];
    const fieldType = GetFieldType(field);
    
    let itemInput: ReactElement = <div />;

    const props = {
      disabled: false,
      value: values[key],
      label: key,
      onChange: (newValue: any) => {
        setValues((old: any) => ({
          ...old,
          [key]: newValue,
        }));
      },
    };

    switch (fieldType) {
      case BooleanFieldTitle:
        itemInput = (
          <BooleanField {...props} />
        );
        break;

      case DateFieldTitle:
        itemInput = (
          <DateField {...props} />
        );
        break;
      
      case TextFieldTitle:
        itemInput = (
          <TextField {...props} />
        );
        break;
      
      case NumberFieldTitle:
        itemInput = (
          <NumberField {...props} />
        );
        break;
      
      case ManySelectTitle:
        itemInput = (
          <ManySelectField {...props} />
        );
        break;
      
      default:
        break;
    }

    return (
      <div key={key}>
        {itemInput}
      </div>
    );
  });

  return (
    <Wrapper>
      <div>
        {inputs}
        <ButtonHolder>
          <Button onClick={handleSubmit}>
            { buttonText }
          </Button>
        </ButtonHolder>
      </div>
    </Wrapper>
  );
};
