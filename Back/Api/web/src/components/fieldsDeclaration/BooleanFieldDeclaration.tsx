import React, { 
  FC,
  ChangeEvent,
  useEffect,
} from 'react';
import { Form } from 'react-bootstrap';

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

  const checkValid = (value: string) => value.length > 2;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    if (e.target.value !== null) {
      onTitleChange(e.target.value);
      onValidChange(checkValid(e.target.value));
    }
  };

  const vaild = checkValid(title);

  return (
    <Form.Group>
      <Form.Label>Boolean. Название:</Form.Label>
      <Form.Control 
        isInvalid={!vaild}
        isValid={vaild}
        type="text"
        value={title}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid">
        Минимум 3 символа
      </Form.Control.Feedback>
    </Form.Group>
  );
};
