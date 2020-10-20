import React, { 
  ChangeEvent, 
  FC, 
  useState,
} from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

import { Form as FormType } from '../domain/types';

const Wrapper = styled.div`
  width: 300px;
  padding: 10px;
`; 

type PropTypes = {
  children?: never;
  item: FormType;
}

export function GetFieldType(field: any): string {
  switch (typeof field) {
    case 'boolean':
      return 'checkbox';

    case 'number':
      return 'number';

    case 'object':
      if (Array.isArray(field)) return 'array';
      if (field instanceof Date) return 'date';
      return 'text';

    default:
      return 'text';
  }
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
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name !== null && value !== null) {
      setValues((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const inputs = keys.map((key) => (
    <Form.Group key={key}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        name={key}
        type={GetFieldType(item.fields[key])}
        value={values[key]}
        onChange={handleChange}
      />
    </Form.Group>
  ));

  return (
    <Wrapper>
      {inputs}
    </Wrapper>
  );
};
