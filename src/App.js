import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import './App.css';

function App() {

  let routes = null;/* (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={Component} />
      <Redirect to="/" />
    </Switch>
  ); */

  return (
    <div>
      <Layout>
          {routes}
      </Layout>
    </div>
  );
}

export default App;
