import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import OrderHistory from '../OrderHistory/OrderHistory';
import NewOrders from '../NewOrders/NewOrders'
import Users from './Users/Users';
import User from './Users/User/User';
import EditUser from './Users/EditUser/EditUser';
import NewUser from './Users/NewUser/NewUser';
import Products from './Products/Products';
import Product from './Products/Product/Product';
import EditProduct from './Products/EditProduct/EditProduct';
import NewProduct from './Products/NewProduct/NewProduct';
import Categories from './Categories/Categories';
import Category from './Categories/Category/Category';
import EditCategory from './Categories/EditCategory/EditCategory';
import NewCategory from './Categories/NewCategory/NewCategory';
import NotFound from '../../components/NotFound/NotFound';

import classes from './Admin.module.css';

const Admin = () => {
    const { path } = useRouteMatch();

    return (
        <div className={classes.AdminBg}>
            <Switch>
                <Route path={`${path}/`} exact>
                    <NewOrders />
                </Route>
                <Route path={`${path}/orders-history`} >
                    <OrderHistory />
                </Route>
                <Route path={`${path}/users/edit/:id`}>
                    <EditUser />
                </Route>
                <Route path={`${path}/users/new-user`}>
                    <NewUser />
                </Route>
                <Route path={`${path}/users/:id`}>
                    <User />
                </Route>
                <Route path={`${path}/users`}>
                    <Users />
                </Route>
                <Route path={`${path}/products/edit/:id`}>
                    <EditProduct />
                </Route>
                <Route path={`${path}/products/new-product`}>
                    <NewProduct />
                </Route>
                <Route path={`${path}/products/:id`}>
                    <Product />
                </Route>
                <Route path={`${path}/products`}>
                    <Products />
                </Route>
                <Route path={`${path}/categories/edit/:id`}>
                    <EditCategory />
                </Route>
                <Route path={`${path}/categories/new-category`}>
                    <NewCategory />
                </Route>
                <Route path={`${path}/categories/:id`}>
                    <Category />
                </Route>
                <Route path={`${path}/categories`}>
                    <Categories />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}

export default Admin