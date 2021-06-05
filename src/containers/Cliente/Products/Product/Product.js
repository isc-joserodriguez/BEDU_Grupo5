import React from 'react'
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap'
import classes from './Product.module.css'


const Product = (props) => {

    const productDetails = () => {
        props.productDetail()
        props.handleShow()
    }

    return (
        <div className={'col mb-3'}>
            <Card className='text-center'>
                <Card.Header className={classes.ProductCardHeader}><h4  className={classes.ProductCardHeaderText}>{props.name}</h4>
                    
                </Card.Header>
                <Card.Body className={classes.ProductCardBody}>
                    <Card.Text className='text-break text-center'>
                        <img className={classes.ProductCard} src={props.image} alt="Platillos De Comida" />
                    </Card.Text>
                    <Button variant='info' className={classes.Button} block onClick={() => productDetails()}>Ver Platillo</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

Product.propTypes = {
    cost: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    productDetail: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
    idProduct: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Product