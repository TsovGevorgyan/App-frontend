import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from './routes';

const AppRouter = () => (
  <Router>
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} component={route.component} path={route.path} />
      ))}
    </Switch>
  </Router>
);

export default AppRouter;
