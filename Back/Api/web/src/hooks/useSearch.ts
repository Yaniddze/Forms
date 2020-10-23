import { 
  useContext, 
  useState,
} from 'react';

import {
  SearchContext,
} from '../dependencies';

import { Form } from '../domain/types';

import {
  StorageAnswer,
} from '../storage/types';

type Answer = {
  fetching: boolean,
  value: StorageAnswer<Form[]>
}

type ReturnType = {
  state: Answer;
  fetch: (query: string) => void;
  cancel: () => void;
}

const initialState: Answer = {
  fetching: false,
  value: {
    success: false,
    errors: [],
    data: [],
  },
};

export const useSearch = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const unit = useContext(SearchContext);

  const fetch = (query: string) => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(query, 10, 0)
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
