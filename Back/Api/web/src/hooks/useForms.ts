// Core
import { 
  useContext, 
  useState,
  useEffect, 
} from 'react';

// Dependencies
import {
  GetFormsContext,
} from '../dependencies';

// Hooks
import { useFormsState } from './state';

// Types
import { Form } from '../domain/types';

type Answer = {
  fetching: boolean;
  value: Form[];
};

type ReturnType = {
  state: Answer;
  cancel: () => void;
}

export const useForms = (): ReturnType => {
  const [fetching, setFetching] = useState(false);
  const { forms, setForms } = useFormsState();
  const unit = useContext(GetFormsContext);

  useEffect(() => {
    setFetching(true);

    unit.Handle(10, 0)
      .then((response) => {
        setFetching(false);
        setForms(response.data);
      });
  }, []);

  const handleCancel = () => {
    if (fetching) {
      unit.Cancel();
    }
  };

  return {
    state: {
      fetching,
      value: forms,
    },
    cancel: handleCancel,
  };
};
