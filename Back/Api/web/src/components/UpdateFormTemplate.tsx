import React, { 
  ChangeEvent, 
  FC, 
  ReactElement, 
  useState,
} from 'react';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';

import { GetFieldType } from '../domain';

import { Form as FormType } from '../domain/types';

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

export const UpdateFormTemplate: FC<PropTypes> = (
  { item }: PropTypes,
) => {
  const keys = Object.keys(item.fields);
  const initialObject: any = {};

  keys.forEach((key) => {
    initialObject[key] = item.fields[key];
  });

  const [values, setValues] = useState(initialObject);
  
  const handleChange = (name: string, value: unknown) => {
    if (name !== null && value !== null) {
      setValues((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const inputs = keys.map((key) => {
    const field: any = item.fields[key];
    const fieldType = GetFieldType(field);

    let itemInput: ReactElement = <div />;

    switch (fieldType.title) {
      case 'boolean':
        itemInput = (
          <Form.Check
            checked={values[key]}
            onChange={() => {
              setValues((old: any) => ({
                ...old,
                [key]: !old[key],
              }));
            }}
          />
        );
        break;

      case 'date':
        itemInput = (
          <Form.Control
            type="date"
            value={values[key]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(key, e.target.value); 
            }}
          />
        );
        break;
      
      case 'number':
        itemInput = (
          <Form.Control
            type="number"
            value={values[key]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(key, e.target.value); 
            }}
          />
        );
        break;
      
      case 'text':
        itemInput = (
          <Form.Control
            type="text"
            value={values[key]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(key, e.target.value); 
            }}
          />
        );
        break;
      
      case 'radio':
        itemInput = (
          <Form.Control
            type="text"
            value={values[key]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(key, e.target.value); 
            }}
          />
        );
        break;
      
      default:
        break;
    }

    return (
      <Form.Group key={key}>
        <Form.Label>{key}</Form.Label>
        {itemInput}
      </Form.Group>
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
