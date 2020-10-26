import React, { ChangeEvent, FC } from 'react';
import { Form } from 'react-bootstrap';

type PropTypes = {
  children?: never;
  value: number;
  onChange: (newValue: number) => void;
  label: string;
  disabled: boolean;
}

export const NumberField: FC<PropTypes> = (
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
      disabled={disabled}
      value={value}
      type="number"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
          onChange(Number(e.target.value));
        }
      }}
    />
  </Form.Group>
);
