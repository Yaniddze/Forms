// Core
import React, { 
  FC,
  useState, 
  useEffect,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { 
  Modal,
  Button, 
} from 'react-bootstrap';

// Templates
import { FormUpdate } from '../components/FormUpdate';
import { FormDeclaration } from '../components/FormDeclaration';
import { FormShow } from '../components/FormShow';

// Hooks
import { 
  useForms,
  useFormCreate, 
  useFormUpdate,
} from '../hooks';

// Types
import { Form } from '../domain';

const Wrapper = styled.div`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  position: fixed;

  bottom: 0;
  right: 0;
  margin: 10px;

  > button {
    border-raduis: 50px;
  }
`;

const ShowFormsWrapper = styled.div`
  display: flex;
  
  > div {
    margin: 10px auto;
    width: 100%;
  }

  @media(min-width: 680px) {
    & {
      > div {
        display: flex;
        flex-wrap: wrap;
        width: 640px;
  
        > div {
          width: 300px;
          margin: 10px;
        }
      }
    }
  }

  @media(min-width: 1000px) {
    & {
      > div {
        width: 980px;
      }
    }
  }
`;

type PropTypes = {
  children?: never;
}

export const FormsPage: FC<PropTypes> = () => {
  const [selectedForm, setSelectedForm] = useState<Partial<Form>>();
  const [declarationOpen, setDeclarationOpen] = useState(false);
  const { state, cancel } = useForms();
  const creation = useFormCreate();
  const update = useFormUpdate();

  useEffect(() => cancel, []);

  const handleModalUpdateHide = () => {
    setSelectedForm(undefined);
  };  

  const handleUpdateSubmit = (form: Form) => {
    if (form.id === '') {
      creation.fetch(form.fields);
    } else {
      update.fetch(form);
    }

    handleModalUpdateHide();
  };

  const handleDeclarationSubmit = (form: Form): void => {
    setSelectedForm(form);
    
    setDeclarationOpen(false);
  };

  const handleDeclarationOpen = (e: MouseEvent): void => {
    e.preventDefault();

    setDeclarationOpen(true);
  };

  const form = (selectedForm as Form);

  const forms = !state.fetching && state.value.map((mappedForm) => (
    <FormShow item={mappedForm} key={mappedForm.id} />
  )); 

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
        <FormUpdate 
          onSubmit={handleUpdateSubmit}
          buttonText={form !== undefined && form.id !== '' ? 'Обновить' : 'Добавить'}
          item={form || { id: '', fields: {} }} 
        />
      </Modal>

      <div>
        <h2>Формы</h2>
        <ShowFormsWrapper>
          <div>
            {forms}
          </div>
        </ShowFormsWrapper>
      </div>

      <ButtonWrapper>
        <Button 
          onClick={handleDeclarationOpen}
          variant="primary"
        >
          +
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
