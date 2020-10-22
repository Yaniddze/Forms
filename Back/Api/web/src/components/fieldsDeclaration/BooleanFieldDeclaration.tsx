import React, { 
  FC,
  ChangeEvent,
  useEffect,
} from 'react';
import { Form } from 'react-bootstrap';

import { TitleValidation } from '../../domain';

type PropTypes = {
  children?: never;
  title: string;
  onTitleChange: (newTitle: string) => void;
  onValueChange: (newValue: boolean) => void;
  onValidChange: (newValue: boolean) => void;
}

export const BooleanFieldDeclaration: FC<PropTypes> = (
  { 
    title, 
    onTitleChange, 
    onValueChange,
    onValidChange, 
  }: PropTypes,
) => {
  useEffect(() => {
    onValueChange(false);

    onValidChange(false);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    if (e.target.value !== null) {
      onTitleChange(e.target.value);
      onValidChange(TitleValidation(e.target.value).valid);
    }
  };

  const { valid, message } = TitleValidation(title);

  return (
    <Form.Group>
      <Form.Label>Boolean. Название:</Form.Label>
      <Form.Control 
        isInvalid={!valid}
        isValid={valid}
        type="text"
        value={title}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid">
        {message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
