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
  onValueChange: (newValue: number) => void;
}

export const NumberFieldDeclaration: FC<PropTypes> = (
  { title, onTitleChange, onValueChange }: PropTypes,
) => { 
  useEffect(() => {
    onValueChange(0);
  }, []);

  return (
    <Form.Group>
      <Form.Label>Number. Название:</Form.Label>
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
