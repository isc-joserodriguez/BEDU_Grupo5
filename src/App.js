import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useRouteMatch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import SignUp from './containers/Auth/SignUp/SignUp';
import Admin from './containers/Admin/Admin';
import Cliente from './containers/Cliente/Cliente';
import Chef from './containers/Chef/Chef';
import Mesero from './containers/Mesero/Mesero';
import NotFound from './components/NotFound/NotFound';


function App(props) {
  const [token, setToken] = useState(null);
  const { history } = props;

  useEffect(() => {
    if (!!localStorage.getItem('type')) {
      setToken(localStorage.getItem('token'));
      history.push(`/${localStorage.getItem('type')}`);
    }
  }, [history, token]);

  let component = null;



  let routes = (
    <Switch>
      <Route path="/" exact>
        <Login setToken={setToken} isAuthenticated={!!token} />
      </Route>
      <Route path="/signup">
        <SignUp setToken={setToken} isAuthenticated={!!token} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )

  if (!!token) {
    switch (localStorage.getItem('type')) {
      case 'admin':
        component = <Admin />;
        break;
      case 'cliente':
        component = <Cliente />;
        break;
      case 'chef':
        component = <Chef />;
        break;
      default:
        component = <Mesero />;
        break;
    }

    routes = (
      <Switch>
        <Route path={`/${localStorage.getItem('type')}`}>
          {component}
        </Route>
        <Route path="/logout">
          <Logout setToken={setToken} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    )

  }


  return (
    <Layout isAuthenticated={!!token}>
      {routes}
    </Layout>
  );
}

export default withRouter(App);
