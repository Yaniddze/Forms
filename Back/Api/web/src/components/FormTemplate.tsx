// Core
import React, { 
  FC, 
  ReactElement, 
  useState,
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
  ManyField,
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
}

export const FormTemplate: FC<PropTypes> = (
  { item }: PropTypes,
) => {
  const keys = Object.keys(item.fields);
  const initialObject: any = {};

  keys.forEach((key) => {
    initialObject[key] = item.fields[key];
  });

  const [values, setValues] = useState(initialObject);

  const inputs = keys.map((key) => {
    const field: any = item.fields[key];
    const fieldType = GetFieldType(field);
    
    let itemInput: ReactElement = <div />;

    switch (fieldType) {
      case BooleanFieldTitle:
        itemInput = (
          <BooleanField 
            checked={values[key]}
            label={key}
            onChange={() => {
              setValues((old: any) => ({
                ...old,
                [key]: !old[key],
              }));
            }}
          />
        );
        break;

      case DateFieldTitle:
        itemInput = (
          <DateField 
            label={key}
            value={values[key] as Date}
            onChange={(newDate: Date) => {
              setValues((old: any) => ({
                ...old,
                [key]: newDate,
              }));
            }}
          />
        );
        break;
      
      case TextFieldTitle:
        itemInput = (
          <TextField 
            label={key}
            value={values[key]}
            onChange={(newValue: string) => {
              setValues((old: any) => ({
                ...old,
                [key]: newValue,
              }));
            }}
          />
        );
        break;
      
      case NumberFieldTitle:
        itemInput = (
          <NumberField
            value={values[key]}
            label={key}
            onChange={(newValue: number) => {
              setValues((old: any) => ({
                ...old,
                [key]: newValue,
              }));
            }}
          />
        );
        break;
      
      case ManySelectTitle:
        itemInput = (
          <ManyField 
            label={key}
            value={values[key] as ManySelect}
            onChange={(newValue: ManySelect) => {
              setValues((old: any) => ({
                ...old,
                [key]: newValue,
              }));
            }}
          />
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
          <Button>
            Обновить
          </Button>
        </ButtonHolder>
      </div>
    </Wrapper>
  );
};
