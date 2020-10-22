import React, { 
  FC,
  ChangeEvent,
  useEffect,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';

import { ManySelect } from '../../domain';

type PropTypes = {
  children?: never;
  title: string;
  onTitleChange: (newTitle: string) => void;
  onValueChange: (newValue: ManySelect) => void;
  value: ManySelect;
}

const ItemWrapper = styled.div`
  margin: 5px 0;

  display: flex;

  align-items: center;

  > button {
    margin-left: 10px;
  }
`;

export const ManyFieldDeclaration: FC<PropTypes> = (
  { 
    title, 
    onTitleChange, 
    onValueChange, 
    value,
  }: PropTypes,
) => { 
  useEffect(() => {
    onValueChange(new ManySelect());
  }, []);

  const handleItemChange = (index: number, newName: string): void => {
    onValueChange({
      ...value,
      values: value.values.map((item, innerIndex) => {
        if (innerIndex === index) {
          return newName;
        }

        return item;
      }),
    });
  };

  const handleAdditionClick = (e: MouseEvent): void => {
    e.preventDefault();

    onValueChange({
      ...value,
      values: [...value.values, ''],
    });
  };

  const handleDeleteClick = (e: MouseEvent, index: number): void => {
    e.preventDefault();

    onValueChange({
      ...value,
      values: value.values.filter((_, innerIndex) => innerIndex !== index),
    });
  };

  const items = value !== null && value.values.map((item, index) => (
    <ItemWrapper key={index}>
      <Form.Control
        type="text"
        value={item}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value !== null) {
            handleItemChange(index, e.target.value);
          }
        }}
      />
      <Button 
        onClick={(e: MouseEvent): void => {
          handleDeleteClick(e, index);
        }}
        variant="danger"
      >
        X
      </Button>
    </ItemWrapper>
  ));

  return (
    <div>
      <Form.Group>
        <Form.Label>Many. Название:</Form.Label>
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
      {items}
      <Button 
        onClick={handleAdditionClick} 
        variant="secondary"
      >
        Добавить поле
      </Button>
    </div>
  );
};
