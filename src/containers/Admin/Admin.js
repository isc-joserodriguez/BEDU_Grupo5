import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import Register from './Register/Register'
import Menu from './Menu/Menu'

const Admin = () => {
    const { path, url } = useRouteMatch();

    return (
        <>
        <h3>Admin Component</h3>
                <ul>
                    <li>
                        <Link to={`${url}/new-user`}>New User</Link>
                    </li>
                    <li>
                        <Link to={`${url}/menu`}>Menu</Link>
                    </li>
                </ul>
        <Switch>
            <Route path={`${path}/new-user`}>
                <Register />
            </Route>
            <Route path={`${path}/menu`}>
                <Menu />
            </Route>
        </Switch>
        </>
    )
}

export default Admin