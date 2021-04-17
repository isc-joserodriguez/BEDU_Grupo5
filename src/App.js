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
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/cliente" exact component={Cliente} />
      <Route path="/chef" exact component={Chef} />
      <Route path="/mesero" exact component={Mesero} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
          {routes}
      </Layout>
    </div>
  );
}

export default App;
