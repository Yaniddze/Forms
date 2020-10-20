import React, { FC } from 'react';

import { UpdateFormTemplate } from '../components/UpdateFormTemplate';
import { Form, ManySelect } from '../domain/types';

type PropTypes = {
  children?: never;
}

export const FormsPage: FC<PropTypes> = () => {
  const radioField = new ManySelect();
  radioField.selected = ['123'];
  radioField.values = ['123', '321', '223'];

  const item: Form = {
    id: '123321',
    fields: {
      field1: new Date(),
      field2: 123321,
      field3: '123321',
      filed4: true,
      filed5: radioField,
    },
  };

  return (
    <div>
      <UpdateFormTemplate item={item} />
    </div>
  );
};
