import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalStyles } from './appSetup';

import { Header } from './components/header';

export const App: FC = () => (
  <div>
    <GlobalStyles />
    <div>
      <Header />
    </div>
    Hello!
  </div>
);

export default App;
