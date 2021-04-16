import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import Admin from './containers/Admin/Admin';
import Cliente from './containers/Cliente/Cliente';

import './App.css';

function App() {

  let routes = (
    <Switch>
      {/* <Route path="/admin" render={(props) => <Auth {...props} />} /> */}
      <Route path="/" exact component={Login} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/cliente" exact component={Cliente} />
      {/* <Redirect to="/" /> */}
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
