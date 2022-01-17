import React, { useEffect } from 'react';
import './scss/style.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './navigation';

const App = () => {
  // useEffect(() => {
  //
  // });
  return (
    <div className="test">
      <AppRouter>
        <Navigation />
      </AppRouter>
    </div>
  );
};

export default App;
