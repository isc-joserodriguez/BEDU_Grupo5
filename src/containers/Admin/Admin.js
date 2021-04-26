import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import Register from './Register/Register';
import Menu from './Menu/Menu';
import Chef from '../Chef/Chef';

const Admin = () => {
    const { path, url } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${path}/new-user`}>
                    <Register />
                </Route>
                <Route path={`${path}/menu`}>
                    <Menu />
                </Route>
                <Route path={`${path}/pedidos`}>
                    <Chef />
                </Route>
            </Switch>
        </>
    )
}

export default Admin