import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  GlobalStyles,
  Routes,
} from './appSetup';

import {
  ApplicationDependecies,
} from './dependencies';

export const App: FC = () => (
  <div>
    <GlobalStyles />
    <ApplicationDependecies>
      <Routes />
    </ApplicationDependecies>
  </div>
);

export default App;
