import React, {
  FC,
  createContext,
  ReactElement,
} from 'react';

import {
  DeleteFormDefault,
  GetFormsDefault,
  SaveFormDefault,  
  SearchDefault,
  UpdateFormDefault,
  
  DeleteFormAxios,
  GetFormsAxios,
  SaveFormAxios,
  SearchAxios,
  UpdateFormAxios,
} from '../storage';

import {
  SaveForm,
  DeleteForm,
  GetForms,
  UpdateForm,
  Search,
} from '../storage/types';

export const GetFormsContext = createContext<GetForms>(new GetFormsDefault());
export const DeleteFormContext = createContext<DeleteForm>(new DeleteFormDefault());
export const SaveFormContext = createContext<SaveForm>(new SaveFormDefault());
export const SearchContext = createContext<Search>(new SearchDefault());
export const UpdateFormContext = createContext<UpdateForm>(new UpdateFormDefault());

type PropTypes = {
  children: ReactElement;
};

export const ApplicationDependecies: FC<PropTypes> = (
  { children }: PropTypes,
) => (
  <GetFormsContext.Provider value={new GetFormsAxios()}>
    <DeleteFormContext.Provider value={new DeleteFormAxios()}>
      <SaveFormContext.Provider value={new SaveFormAxios()}>
        <SearchContext.Provider value={new SearchAxios()}>
          <UpdateFormContext.Provider value={new UpdateFormAxios()}>
            {children}
          </UpdateFormContext.Provider>
        </SearchContext.Provider>
      </SaveFormContext.Provider>
    </DeleteFormContext.Provider>
  </GetFormsContext.Provider>
);
