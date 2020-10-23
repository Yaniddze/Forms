import { 
  useContext, 
  useState,
} from 'react';

import {
  UpdateFormContext,
} from '../dependencies';

import { Form } from '../domain/types';

import {
  StorageAnswer,
} from '../storage/types';

type Answer = {
  fetching: boolean,
  value: StorageAnswer<Form>
}

type ReturnType = {
  state: Answer;
  fetch: (form: Form) => void;
  cancel: () => void;
}

const initialState: Answer = {
  fetching: false,
  value: {
    success: false,
    errors: [],
    data: {
      id: '',
      fields: {},
    },
  },
};

export const useFormUpdate = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const unit = useContext(UpdateFormContext);

  const fetch = (form: Form) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(form)
      .then((response) => {
        setAnswer(() => ({
          fetching: false,
          value: response,
        }));
      });
  };

  const handleCancel = () => {
    if (answer.fetching) {
      unit.Cancel();
    }
  };

  return {
    state: answer,
    fetch,
    cancel: handleCancel,
  };
};
