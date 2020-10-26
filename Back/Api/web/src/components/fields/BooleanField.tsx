import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

type PropTypes = {
  children?: never;
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
  disabled: boolean;
}

export const BooleanField: FC<PropTypes> = (
  { 
    value, 
    onChange, 
    label, 
    disabled, 
  }: PropTypes,
) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Check 
      checked={value}
      onChange={() => {
        onChange(!value);
      }}
      disabled={disabled}
    />
  </Form.Group>
);
