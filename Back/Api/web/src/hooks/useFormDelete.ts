import { 
  useContext, 
  useState,
} from 'react';

import {
  DeleteFormContext,
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
  fetch: (id: string) => void;
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

export const useFormDelete = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const unit = useContext(DeleteFormContext);

  const fetch = (id: string) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(id)
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
