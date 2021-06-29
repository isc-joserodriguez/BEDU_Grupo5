import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import { Button, Container } from 'react-bootstrap';
import ProductModal from './ProductModal/ProductModal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Products.module.css';

import { timeInterval } from '../../../shared/utility';

import { getProductsByCategory, getCategoriesCommands } from '../../../services';
const Products = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [bandera, setBandera] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    getCategoriesCommands({ setCategories });
    getProductsByCategory({ setProducts, setLoading, filter: bandera });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCategoriesCommands({ setCategories });
      getProductsByCategory({ setProducts, setLoading, filter: bandera });
    }, timeInterval);
    return () => clearInterval(interval);
  }, [bandera])

  const productMap = products.map(product => (
    <Product
      key={product._id}
      product={product}
      handleShow={handleShow}
      setProduct={setProduct}
    />
  ));

  return (
    <Container className='mb-4'>
      <div className={`${classes.ButtonsContainer} col d-flex flex-wrap mb-4 align-content-center justify-content-center`}>
        <Button className={`${classes.CategoryBtn} p-2 m-2`} variant="outline-secondary" onClick={() => {
          setBandera({});
          getProductsByCategory({ setProducts, setLoading, filter: {} });
        }} >Todos</Button>
        {
          categories.map((el, index) => (
            <Button
              key={index}
              variant='outline-primary'
              className='p-2 m-2'
              onClick={() => {
                setBandera({ categoria: el._id });
                getProductsByCategory({ setProducts, setLoading, filter: { categoria: el._id } });
              }
              }
            >
              {el.name}
            </Button>
          ))
        }
      </div>
      <div className={classes.CardsOuterContainer}>
        <div className={`${classes.CardsContainer} overflow-auto`}>
          <Container className='overflow-auto vh-75'>
            {loading ?
              <Spinner /> :
              productMap.length === 0 ?
                <h1 className={`${classes.MessageD} text-center mt-5`}>Seleccione una categoría</h1> :
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 overflow-auto'>
                  {productMap}
                </div>}
          </Container>
          <ProductModal
            productID={product?._id}
            show={show}
            handleClose={handleClose}
          />
        </div>
      </div>
    </Container >
  );
}
export default Products;