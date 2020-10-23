// Core
import { 
  useContext, 
  useState,
} from 'react';

// Dependencies
import {
  SaveFormContext,
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
  fetch: (field: Record<string, unknown>) => void;
  cancel: () => void;
}

const initialState: Answer = {
  fetching: false,
  value: {
    success: false,
    errors: [],
  },
};

export const useFormCreate = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const { addForm } = useFormsState();
  const unit = useContext(SaveFormContext);

  const fetch = (fields: Record<string, unknown>) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(fields)
      .then((response) => {
        if (response.success) {
          addForm({
            id: response.data,
            fields,
          });
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
