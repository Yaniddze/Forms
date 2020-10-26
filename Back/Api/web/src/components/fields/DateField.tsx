import React, { FC, ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

type PropTypes = {
  children?: never;
  value: Date;
  onChange: (newDate: Date) => void;
  label: string;
  disabled: boolean;
}

export const DateField: FC<PropTypes> = (
  { 
    value, 
    onChange, 
    label,
    disabled, 
  }: PropTypes,
) => { 
  const localeValue = value.toLocaleDateString().split('.');
  const date = `${localeValue[2]}-${localeValue[1]}-${localeValue[0]}`;

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        disabled={disabled}
        value={date} 
        type="date"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value !== null) {
            onChange(new Date(e.target.value));
          }
        }}
      />
    </Form.Group>
  );
};
