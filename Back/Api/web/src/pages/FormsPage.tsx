import React, { 
  FC,
  useState, 
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { 
  Modal,
  Button, 
} from 'react-bootstrap';

import { FormTemplate } from '../components/FormTemplate';
import { FormDeclaration } from '../components/FormDeclaration';

import { Form } from '../domain';

const Wrapper = styled.div`
  padding: 10px;
`;

type PropTypes = {
  children?: never;
}

export const FormsPage: FC<PropTypes> = () => {
  const [selectedForm, setSelectedForm] = useState<Partial<Form>>();
  const [declarationOpen, setDeclarationOpen] = useState(false);

  const handleModalUpdateHide = () => {
    setSelectedForm(undefined);
  };

  const handleDeclarationSubmit = (form: Form): void => {
    setSelectedForm(form);
    
    setDeclarationOpen(false);
  };

  const handleDeclarationOpen = (e: MouseEvent): void => {
    e.preventDefault();

    setDeclarationOpen(true);
  };

  return (
    <Wrapper>

      <Modal 
        show={declarationOpen}
        onHide={() => {
          setDeclarationOpen(false);
        }}
      >
        <FormDeclaration 
          onSubmit={handleDeclarationSubmit}
        />
      </Modal>

      <Modal 
        show={selectedForm !== undefined}
        onHide={handleModalUpdateHide}
      >
        <FormTemplate 
          item={selectedForm as Form || { id: '', fields: {} }} 
        />
      </Modal>

      <Button 
        onClick={handleDeclarationOpen}
        variant="primary"
      >
        +
      </Button>

    </Wrapper>
  );
};
