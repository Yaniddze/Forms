import React, { ChangeEvent, FC } from 'react';
import { Form } from 'react-bootstrap';

type PropTypes = {
  children?: never;
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  disabled: boolean;
}

export const TextField: FC<PropTypes> = (
  { 
    value, 
    onChange, 
    label,
    disabled, 
  }: PropTypes,
) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control 
      value={value}
      type="text"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
          onChange(e.target.value);
        }
      }}
    />
  </Form.Group>
);
