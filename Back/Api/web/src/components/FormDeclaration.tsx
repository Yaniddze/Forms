// Core
import React, { 
  FC,
  useState, 
  ChangeEvent,
  MouseEvent,
} from 'react';

import styled from 'styled-components';

import { 
  Form,
  Button, 
} from 'react-bootstrap';

// Domain
import { 
  TextFieldTitle,
  BooleanFieldTitle,
  DateFieldTitle,
  ManySelectTitle,
  NumberFieldTitle,
  AvalibleTypes,
  Form as FormType,
} from '../domain';

// Fields
import {
  BooleanFieldDeclaration,
  TextFieldDeclaration,
  DateFieldDeclaration,
  NumberFieldDeclaration,
  ManyFieldDeclaration,
} from './fieldsDeclaration';

const Wrapper = styled.div`
  padding: 10px;

  > div {
    margin: 10px 0;
  }
`;

const CreationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  > button {
    margin-left: 10px;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  > button {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 32px;
  }

  > *:first-child {
    width: 100%;
    margin-right: 50px;
  }
`;

const RightWrapper = styled.div`
  display: flex;

  > * {
    margin-left: auto;
  }
`;

type PropTypes = {
  children?: never;
  onSubmit: (form: FormType) => void;
}

type Field = {
  id: number;
  title: string;
  type: AvalibleTypes;
  valid: boolean;
  value: any;
};

export const FormDeclaration: FC<PropTypes> = (
  { onSubmit }: PropTypes,
) => { 
  const [selectedType, setSelectedType] = useState<AvalibleTypes>(TextFieldTitle);
  const [fields, setFields] = useState<Field[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== null) {
      setSelectedType(e.target.value as AvalibleTypes);
    }
  };

  const handleAdditionClick = (e: MouseEvent): void => {
    e.preventDefault();

    setFields((old) => ([
      ...old,
      {
        id: idCounter,
        title: '',
        type: selectedType,
        value: null,
        valid: false,
      },
    ]));

    setIdCounter((old) => old + 1);
  };

  const handleTitleChange = (id: number, newTitle: string): void => {
    setFields((old: Field[]) => old.map((fieldMap: Field) => {
      if (fieldMap.id === id) {
        return {
          ...fieldMap,
          title: newTitle,
        };
      }

      return fieldMap;
    }));
  };

  const handleValueChange = (id: number, newValue: any): void => {
    setFields((old: Field[]) => old.map((fieldMap: Field) => {
      if (fieldMap.id === id) {
        return {
          ...fieldMap,
          value: newValue,
        };
      }

      return fieldMap;
    }));
  };

  const handleDeleteClick = (e: MouseEvent, id: number): void => {
    e.preventDefault();

    setFields((old: Field[]) => old.filter((fieldFilter: Field) => fieldFilter.id !== id));
  };

  const handleSubmit = (e: MouseEvent): void => {
    e.preventDefault();

    const result: FormType = {
      id: '',
      fields: {},
    };

    fields.forEach((field) => {
      result.fields[field.title] = field.value;
    });

    onSubmit(result);
  };

  const handleValidChange = (id: number, newValue: boolean): void => {
    setFields((old: Field[]) => old.map((mappedField: Field) => {
      if (mappedField.id === id) {
        return {
          ...mappedField,
          valid: newValue,
        };
      }

      return mappedField;
    }));
  };

  const fieldsToRender = fields.map((field) => { 
    let input = <div />;

    const props = {
      title: field.title,
      onTitleChange: (newTitle: string): void => {
        handleTitleChange(field.id, newTitle);
      },
      value: field.value,
      onValueChange: (newValue: any): void => {
        handleValueChange(field.id, newValue);
      },
      onValidChange: (newValue: boolean): void => {
        handleValidChange(field.id, newValue);
      },
    };

    switch (field.type) {
      case BooleanFieldTitle:
        input = <BooleanFieldDeclaration {...props} />;
        break;

      case TextFieldTitle:
        input = <TextFieldDeclaration {...props} />;
        break;
      
      case DateFieldTitle:
        input = <DateFieldDeclaration {...props} />;
        break;
      
      case NumberFieldTitle:
        input = <NumberFieldDeclaration {...props} />;
        break;
      
      case ManySelectTitle:
        input = <ManyFieldDeclaration {...props} />;
        break;

      default: 
        break;
    }

    return (
      <FieldWrapper key={field.id}>
        { input }
        <Button 
          onClick={(e: MouseEvent): void => {
            handleDeleteClick(e, field.id);
          }}
          variant="danger"
        >
          X
        </Button>
      </FieldWrapper>
    );
  });

  const nextDisabled = fields.length === 0 || fields.find((field) => !field.valid) !== undefined;  

  return (
    <Wrapper>
      
      <CreationWrapper>
        <Form.Control
          as="select"
          value={selectedType}
          onChange={handleSelectChange}
        >
          <option value={TextFieldTitle}>{TextFieldTitle}</option>
          <option value={BooleanFieldTitle}>{BooleanFieldTitle}</option>
          <option value={DateFieldTitle}>{DateFieldTitle}</option>
          <option value={ManySelectTitle}>{ManySelectTitle}</option>
          <option value={NumberFieldTitle}>{NumberFieldTitle}</option>
        </Form.Control>  
        <Button
          onClick={handleAdditionClick}
        >
          Создать
        </Button>
      </CreationWrapper>

      <div>
        {fieldsToRender}
      </div>

      <RightWrapper>
        <Button 
          onClick={handleSubmit}
          disabled={nextDisabled}
        >
          Далее
        </Button>
      </RightWrapper>

    </Wrapper>
  );
};
