import React from 'react'
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap'
import classes from './Product.module.css'


const Product = (props) => {

    const productDetails = () => {
        props.setProduct(props.product)
        props.handleShow()
    }

    return (
        <div className={'col mb-3'}>
            <Card className='text-center'>
                <Card.Header className={classes.ProductCardHeader}>
                    <h4 className={classes.ProductCardHeaderText}>{props.product.name}</h4>
                </Card.Header>
                <Card.Body className={classes.ProductCardBody}>
                    <Card.Text className='text-break text-center'>
                        <img className={classes.ProductCard} src={props.product.image} alt="Platillos De Comida" />
                    </Card.Text>
                    <Button variant='info' className={classes.Button} block onClick={() => productDetails()}>Ver Platillo</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
    handleShow: PropTypes.func.isRequired,
    setProduct: PropTypes.func.isRequired
}

export default Product