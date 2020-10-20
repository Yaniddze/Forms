import React, { FC } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;

  align-items: center;
  justify-content: space-around;

  > button {
    margin-left: 10px;
  }
`;

export const Header: FC = () => {
  return (
    <Wrapper>
      <Form.Control
        placeholder="Поиск..."
        type="text"
      />
      <Button>
        Найти
      </Button>
    </Wrapper>
  );
};
