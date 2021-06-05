import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { newOrder } from '../../../../services'
import classes from './ProductModal.module.css'

const ProductModal = (props) => {
    const [cart, setCart] = useState([]);
    const myFunc = (total, num) => total + num;

    const createOrder = (info, cost) => {
        newOrder({ info, cost });
        props.handleClose();
        setCart([]);
    }

    const addProduct = () => {
        setCart(cart.concat({
            _id: props.product._id,
            name: props.product.name,
            cost: props.product.cost
        }
        ))
    }

    const deleteProductFromCart = (i) => {
        var newarray = [...cart]
        if (i !== 0) {
            newarray.splice(i, 1);
        } else {
            newarray.shift()
        }
        setCart(newarray)
    }


    const listItems = cart.map((product, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.cost}</td>
            <td><Button variant='danger' className='float-left' onClick={() => { deleteProductFromCart(index) }}>Eliminar De Carrito</Button></td>
        </tr>
    ));

    return (

        <Modal show={props.show} onHide={props.handleClose}>

            <Modal.Header closeButton>
                <Modal.Title style={{color: '#FF8352'}}>{props.product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    <img className={classes.ProductModalImage} src={props.product.image} alt="Platillo" />
                </div>
                <div className={classes.ProductModalBody}>
                    <div className={classes.ProductModalBodyDescription}>
                        <p style={{color: '#FF8352'}}><b>Descripción:</b></p>
                        <p>{(props.product.description)}</p>
                    </div>
                    <div className={classes.ProductModalBodyCost}>
                        <p style={{color: '#FF8352'}}><b>Costo:</b></p>
                        <h4>${(props.product.cost)}</h4>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                {
                    (cart.length < 2) &&
                    <Button variant='primary' className={`${classes.orderThis} float-left`} onClick={() => { createOrder([props.product._id], props.product.cost) }}>
                        Ordenar Solo Este Platillo
                    </Button>
                }

                <Button variant='success' className={`${classes.addCart} float-left`} onClick={addProduct}>
                    Agregar a Carrito
                </Button>
                <Button className={classes.exitBtn}  variant='secondary' onClick={props.handleClose}> Salir </Button>
            </Modal.Footer>
            {cart.length > 0 &&
                <>
                    <h3>Tu Pedido.</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto:</th>
                                <th>Precio:</th>
                                <th>Eliminar:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems}
                        </tbody>
                    </Table>
                    <ul><strong>Total:</strong> {cart.map(el => el.cost).reduce(myFunc)}</ul>

                    <Button variant='primary' className='float-left' onClick={() => { createOrder(cart.map(el => el._id), cart.map(el => el.cost).reduce(myFunc)) }}>
                        Ordenar Carrito
                    </Button>
                </>
            }
        </Modal>
    )
}

ProductModal.propTypes = {
    product: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
}

export default ProductModal;