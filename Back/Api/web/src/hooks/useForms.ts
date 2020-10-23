import { 
  useContext, 
  useState,
  useEffect, 
} from 'react';

import {
  GetFormsContext,
} from '../dependencies';

import { Form } from '../domain/types';

import {
  StorageAnswer,
} from '../storage/types';

type Answer = {
  fetching: boolean,
  value: StorageAnswer<Form[]>
};

type ReturnType = {
  state: Answer;
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

export const useForms = (): ReturnType => {
  const [answer, setAnswer] = useState<Answer>(initialState);
  const unit = useContext(GetFormsContext);

  useEffect(() => {
    setAnswer((old: Answer) => ({
      ...old,
      fetching: true,
    }));

    unit.Handle(10, 0)
      .then((response) => {
        setAnswer(() => ({
          fetching: false,
          value: response,
        }));
      });
  }, []);

  const handleCancel = () => {
    if (answer.fetching) {
      unit.Cancel();
    }
  };

  return {
    state: answer,
    cancel: handleCancel,
  };
};
