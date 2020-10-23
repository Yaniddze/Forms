// Core
import { 
  useContext, 
  useState,
} from 'react';

// Dependencies
import {
  DeleteFormContext,
} from '../dependencies';

// Hooks
import { useFormsState } from './state';

type Answer = {
  fetching: boolean;
  value: {
    success: boolean;
    errors: string[];
  };
};

type ReturnType = {
  state: Answer;
  fetch: (id: string) => void;
  cancel: () => void;
}

const initialState: Answer = {
  fetching: false,
  value: {
    success: false,
    errors: [],
  },
};

export const useFormDelete = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const { deleteForm } = useFormsState();
  const unit = useContext(DeleteFormContext);

  const fetch = (id: string) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(id)
      .then((response) => {
        if (response.success) {
          deleteForm(response.data);
        }

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
