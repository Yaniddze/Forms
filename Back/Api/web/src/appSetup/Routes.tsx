// Core
import React, { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

// Components
import { Header } from '../components/header';

// Pages
import { FormsPage } from '../pages/FormsPage';

type PropTypes = {
  children?: never;
}

export const Routes: FC<PropTypes> = () => (
  <BrowserRouter>

    <Header />
    
    <Switch>
      <Route path="/">
        <FormsPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
