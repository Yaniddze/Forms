import { 
  useContext, 
  useState,
} from 'react';

import {
  SaveFormContext,
} from '../dependencies';

import {
  StorageAnswer,
} from '../storage/types';

type Answer = {
  fetching: boolean,
  value: StorageAnswer<string>
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
    data: '',
  },
};

export const useFormCreate = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const unit = useContext(SaveFormContext);

  const fetch = (fields: Record<string, unknown>) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(fields)
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
