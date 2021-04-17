import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import Admin from './containers/Admin/Admin';
import Cliente from './containers/Cliente/Cliente';

function App() {

  let routes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/cliente" exact component={Cliente} />
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
