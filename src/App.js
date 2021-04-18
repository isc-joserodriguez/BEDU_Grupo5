import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';
import Admin from './containers/Admin/Admin';
import Cliente from './containers/Cliente/Cliente';
import Chef from './containers/Chef/Chef';
import Mesero from './containers/Mesero/Mesero';

function App() {

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/cliente">
        <Cliente />
      </Route>
      <Route path="/chef">
        <Chef />
      </Route>
      <Route path="/mesero">
        <Mesero />
      </Route>
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
