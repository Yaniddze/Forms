import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

type PropTypes = {
  children?: never;
  checked: boolean;
  onChange: () => void;
  label: string;
}

export const BooleanField: FC<PropTypes> = (
  { checked, onChange, label }: PropTypes,
) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Check 
      checked={checked}
      onChange={onChange}
    />
  </Form.Group>
);
