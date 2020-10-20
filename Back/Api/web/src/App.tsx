import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  GlobalStyles,
  Routes,
} from './appSetup';

export const App: FC = () => (
  <div>
    <GlobalStyles />
    <Routes />
  </div>
);

export default App;
