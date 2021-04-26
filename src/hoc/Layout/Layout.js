import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuthenticated={props.isAuthenticated} />
            <SideDrawer
                open={sideDrawerIsVisible}
                closed={sideDrawerToggleHandler}
                isAuthenticated={props.isAuthenticated} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </>

    );
}

Layout.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

export default Layout;