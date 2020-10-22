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
  onValueChange: (newValue: string) => void;
}

export const TextFieldDeclaration: FC<PropTypes> = (
  { title, onTitleChange, onValueChange }: PropTypes,
) => { 
  useEffect(() => {
    onValueChange('');
  }, []);

  return (
    <Form.Group>
      <Form.Label>Text. Название:</Form.Label>
      <Form.Control 
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value !== null) {
            onTitleChange(e.target.value);
          }
        }}
      />
    </Form.Group>
  );
};
