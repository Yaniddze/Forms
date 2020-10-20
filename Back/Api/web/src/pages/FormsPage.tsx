import React, { FC } from 'react';

import { FormTemplate } from '../components/FormTemplate';
import { Form, ManySelect } from '../domain/types';

type PropTypes = {
  children?: never;
}

export const FormsPage: FC<PropTypes> = () => {
  const manySelect = new ManySelect();
  manySelect.selected = ['123'];
  manySelect.values = ['123', '321', '223'];

  const item: Form = {
    id: '123321',
    fields: {
      field1: new Date(),
      field2: 123321,
      field3: '123321',
      filed4: true,
      filed5: manySelect,
    },
  };

  return (
    <div>
      <FormTemplate item={item} />
    </div>
  );
};
