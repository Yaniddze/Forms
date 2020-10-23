// Core
import { 
  useContext, 
  useState,
} from 'react';

// Dependencies
import {
  UpdateFormContext,
} from '../dependencies';

// Hooks
import { useFormsState } from './state';

// Types
import { Form } from '../domain/types';

type Answer = {
  fetching: boolean;
  value: {
    success: boolean;
    errors: string[];
  };
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
  },
};

export const useFormUpdate = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const { updateForm } = useFormsState();
  const unit = useContext(UpdateFormContext);

  const fetch = (form: Form) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(form)
      .then((response) => {
        if (response.success) {
          updateForm(response.data);
        }

        setAnswer({
          fetching: false,
          value: response,
        });
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
