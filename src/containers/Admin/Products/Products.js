import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchPanel from '../../SearchPanel/SearchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Table from 'react-bootstrap/Table'
import Spinner from '../../../components/UI/Spinner/Spinner';
import { ImEye as DetailIcon } from 'react-icons/im';
import { Card, Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { getProducts } from '../../../services';

import classes from './Products.module.css';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts({ setProducts, setLoading });
    }, []);

    return (
        <div className={`${classes.Products}`}>
            <SearchPanel />
            <br />
            <Card className={classes.Card}>
                <section className={classes.buttonContainer}>
                    <Link to='/admin/products/new-product'><Button className={classes.orangeBtn} size='sm'><p className={classes.big}>+</p> Nuevo producto</Button></Link>
                </section>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Foto', 'Nombre', 'Descripción', 'Costo', 'Categoria', 'Estado', 'Ver']}
                            rows={products.map((el, index) => (
                                <tr key={index}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td><Image style={{ maxWidth: '50%' }} src={el.image} thumbnail /></td>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>{el.cost}</td>
                                    <td>{el.idCategoria.name}</td>
                                    <td>{el.status ? 'Activo' : 'Inactivo'}</td>
                                    <td><Link to={`/admin/products/${el._id}`}><DetailIcon className={`${classes.blue}`} /></Link></td>
                                </tr>

                            ))
                            }
                        />
                    </div>
                }

            </Card>
        </div>
    )
}

export default Products
