import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getProductById } from '../../../../services';
import { FiEdit3 } from 'react-icons/fi';
import { Card } from 'react-bootstrap';

import classes from './Product.module.css';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getProductById({ id, setProduct, setLoading })
    }, [id])

    return (
        loading ?
            <Spinner /> :
            <Card className={classes.Product}>
                <Card.Img
                    variant='top'
                    src={product.image}
                />
                <Card.Body>
                    <Card.Title style={{ textTransform: 'capitalize' }}>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className='text-muted'>
                        {`Ultima actualización el ${new Date(product.updatedAt).getDate()}/${new Date(product.updatedAt).getMonth() + 1}/${new Date(product.updatedAt).getFullYear()}`}
                        <br />
                        <Link className={classes.orange}  to={`/admin/products/edit/${product._id}`}>Editar <FiEdit3/></Link>
                    </small>
                </Card.Footer>
            </Card>
    )
}

export default Product
