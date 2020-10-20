import React, { FC } from 'react';

import { UpdateFormTemplate } from '../components/UpdateFormTemplate';
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
      filed4: true,
    },
  };

  return (
    <div>
      <UpdateFormTemplate item={item} />
    </div>
  );
};
