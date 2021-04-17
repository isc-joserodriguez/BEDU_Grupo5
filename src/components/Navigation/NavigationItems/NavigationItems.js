import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Login</NavigationItem>
        <NavigationItem link="/admin" exact >Admin</NavigationItem>
        <NavigationItem link="/cliente" exact >Cliente</NavigationItem>
        <NavigationItem link="/chef" exact >Chef</NavigationItem>
        <NavigationItem link="/mesero" exact >Mesero</NavigationItem>
        {/* {props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {props.isAuthenticated
            ? <NavigationItem link="/logout" >Logout</NavigationItem>
            : <NavigationItem link="/auth" >Authenticate</NavigationItem>} */}
    </ul>
);

export default navigationItems