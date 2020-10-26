import React, { 
  FC,
} from 'react';
import { Form } from 'react-bootstrap';

import { ManySelect } from '../../domain/types';

type PropTypes = {
  children?: never;
  value: ManySelect;
  onChange: (newValue: ManySelect) => void;
  label: string;
  disabled: boolean;
}

export const ManySelectField: FC<PropTypes> = (
  { 
    value, 
    onChange, 
    label,
    disabled, 
  }: PropTypes,
) => { 
  const handleChange = (title: string): void => {
    if (value.selected.includes(title)) {      
      onChange({
        values: value.values,
        selected: value.selected.filter((val) => val !== title),
      });
    } else {
      onChange({
        values: value.values,
        selected: [...value.selected, title],
      });
    }
  };

  const items = value.values.map((title) => (
    <Form.Check
      disabled={disabled}
      label={title}
      key={title}
      type="checkbox"
      checked={value.selected.includes(title)}
      onChange={() => {
        handleChange(title);
      }}
    />
  ));

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {items}
    </Form.Group>
  );
};
