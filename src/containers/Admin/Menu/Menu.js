import React from 'react'

import Categories from '../Categories/Categories';
import NewCategory from '../Categories/NewCategory/NewCategory';
import Products from '../Products/Products';
import NewProduct from '../Products/NewProduct/NewProduct';


const Menu = () => {
    return (
        <>
            <Categories />
            <hr />
            <NewCategory />
            <hr />
            <Products />
            <hr />
            <NewProduct />
        </>
    )
}

export default Menu
