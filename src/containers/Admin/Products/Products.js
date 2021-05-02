import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchPanel from '../../SearchPanel/searchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { Card, Image } from 'react-bootstrap';

import { getProducts } from '../../../services';

import classes from './Products.module.css';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts({ setProducts, setLoading });
    }, []);

    console.log(products[0])

    return (
        <div className={`${classes.Products}`}>
            <SearchPanel />
            <Card className={classes.Card}>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Foto', 'Nombre', 'Descripción', 'Costo', 'Categoria', 'Estado']}
                            rows={products.map((el, index) => (
                                <tr key={index}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td><Image style={{maxWidth:'50%'}} src={el.image} thumbnail/></td>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>{el.cost}</td>
                                    <td>{el.idCategoria.name}</td>
                                    <td>{el.status ? 'Activo' : 'Inactivo'}</td>
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
