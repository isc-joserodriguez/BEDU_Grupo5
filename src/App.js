import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import SignUp from './containers/Auth/SignUp/SignUp';
import Admin from './containers/Admin/Admin';
import Cliente from './containers/Cliente/Cliente';
import Chef from './containers/Chef/Chef';
import Mesero from './containers/Mesero/Mesero';
import NotFound from './components/NotFound/NotFound';
import AboutUs from './components/AboutUs/AboutUs';

function App(props) {
  const [token, setToken] = useState(null);
  const { history, location: { pathname } } = props;

  const components = {
    'admin': <Admin />,
    'cliente': <Cliente />,
    'chef': <Chef />,
    'mesero': <Mesero />
  }

  useEffect(() => {
    if (!!localStorage.getItem('type')) {
      setToken(localStorage.getItem('token'));
      if (!pathname.includes(`/${localStorage.getItem('type')}`))
        history.push(`/${localStorage.getItem('type')}`);
    } else {
      setToken(null);
    }
  }, [history, token, pathname]);

  let component = null;

  const logout = () => {
    localStorage.clear();
    props.history.push('/');
  }

  let routes = (
    <Switch>
      <Route path='/' exact>
        <Login setToken={setToken} isAuthenticated={!!token} />
      </Route>
      <Route path='/signup'>
        <SignUp setToken={setToken} isAuthenticated={!!token} />
      </Route>
      <Route path='/about-us'>
        <AboutUs />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )

  if (!!token) {
    component = components[localStorage.getItem('type')];

    routes = (
      <Switch>
        <Route path={`/${localStorage.getItem('type')}`}>
          {component}
        </Route>
        <Route path='/logout'>
          <Logout logout={logout} />
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
