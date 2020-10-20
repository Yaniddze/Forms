import React, { FC } from 'react';

import { FormTemplate } from '../components/FormTemplate';
import { Form } from '../domain/types';

type PropTypes = {
  children?: never;
}

export const FormsPage: FC<PropTypes> = () => {
  const item: Form = {
    id: '123321',
    fields: {
      field1: new Date(),
      field2: 123321,
      field3: '123321',
    },
  };

  return (
    <div>
      <FormTemplate item={item} />
    </div>
  );
};
