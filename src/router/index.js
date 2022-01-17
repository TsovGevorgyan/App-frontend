import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import routes from './routes';

const signedHomePage = '/dashboard';
const unsignedHomePage = '/login';

const user = localStorage.getItem('userAccount');
const homePage = user ? signedHomePage : unsignedHomePage;

const AppRouter = ({ children }) => {
  return (
    <Router>
      {children}
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
          />
        ))}
        <Redirect to={homePage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
