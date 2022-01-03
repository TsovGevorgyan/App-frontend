import React, { useEffect } from 'react';
import './scss/style.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from './redux/auth/actions';
import { listRequest } from './redux/product/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRequest());
  }, [dispatch]);

  return (
    <div className="test">
      <AppRouter />
    </div>
  );
};

export default App;
