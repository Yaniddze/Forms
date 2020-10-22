import React, { 
  FC,
  ChangeEvent,
  useEffect,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';

import { 
  ManySelect, 
  TitleValidation, 
  ManyFieldItemValidation,
} from '../../domain';

type PropTypes = {
  children?: never;
  title: string;
  onTitleChange: (newTitle: string) => void;
  onValueChange: (newValue: ManySelect) => void;
  onValidChange: (newValue: boolean) => void;
  value: ManySelect;
}

const ItemWrapper = styled.div`
  margin: 5px 0;
  position: relative;
  display: flex;

  align-items: center;

  > *:first-child {
    width: 100%;
    padding-right: 50px;
  }

  > button {
    position: absolute;
    top: 0;
    right: 0;
    margin-left: 10px;
  }
`;

export const ManyFieldDeclaration: FC<PropTypes> = (
  { 
    title, 
    onTitleChange, 
    onValueChange, 
    onValidChange,
    value,
  }: PropTypes,
) => { 
  useEffect(() => {
    onValueChange(new ManySelect());

    onValidChange(false);
  }, []);

  const getValidationValue = (items: string[]): boolean => {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      
      if (!ManyFieldItemValidation(item).valid) {
        return false;
      }
    }

    return TitleValidation(title).valid && items.length > 0;
  };

  const handleItemChange = (index: number, newName: string): void => {
    const newValues = value.values.map((item, innerIndex) => {
      if (innerIndex === index) {
        return newName;
      }

      return item;
    });

    onValueChange({
      ...value,
      values: newValues,
    });

    onValidChange(getValidationValue(newValues));
  };

  const handleAdditionClick = (e: MouseEvent): void => {
    e.preventDefault();

    onValueChange({
      ...value,
      values: [...value.values, ''],
    });

    onValidChange(false);
  };

  const handleDeleteClick = (e: MouseEvent, index: number): void => {
    e.preventDefault();
    const newValues = value.values.filter((_, innerIndex) => innerIndex !== index);

    onValueChange({
      ...value,
      values: newValues,
    });

    onValidChange(getValidationValue(newValues));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    if (e.target.value !== null) {
      onTitleChange(e.target.value);
      onValidChange(getValidationValue(value.values));
    }
  };

  const items = value !== null && value.values.map((item, index) => { 
    const itemValidation = ManyFieldItemValidation(item);

    return (
      <ItemWrapper key={index}>
        <Form.Group>
          <Form.Control
            isValid={itemValidation.valid}
            isInvalid={!itemValidation.valid}
            type="text"
            value={item}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value !== null) {
                handleItemChange(index, e.target.value);
              }
            }}
          />
          <Form.Control.Feedback type="invalid">
            {itemValidation.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button 
          onClick={(e: MouseEvent): void => {
            handleDeleteClick(e, index);
          }}
          variant="danger"
        >
          X
        </Button>
      </ItemWrapper>
    );
  });

  const { valid, message } = TitleValidation(title);

  return (
    <div>
      <Form.Group>
        <Form.Label>Many. Название:</Form.Label>
        <Form.Control 
          isValid={valid}
          isInvalid={!valid}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <Form.Control.Feedback type="invalid">
          {message}
        </Form.Control.Feedback>
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
