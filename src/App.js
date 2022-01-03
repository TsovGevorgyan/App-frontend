import React, { useEffect } from 'react';
import './scss/style.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="test">
      <AppRouter />
    </div>
  );
};

export default App;
