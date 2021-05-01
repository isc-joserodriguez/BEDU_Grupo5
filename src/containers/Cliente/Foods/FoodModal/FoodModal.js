import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { createPedido } from '../../../../services/foods'
const FoodModal = (props) => {
    const [cart, setCart] = useState([]);
    const [cartName, setCartName] = useState([]);
    const [costCart, setCostCart] = useState([]);

    function myFunc(total, num) {
        return total + num;
    }

    const listItems = cartName.map((cart) =>`Producto: ${cart}`).map((text,index) =>(
        <li key={index}>{`${text} Precio: ${costCart[index]}`}</li>
        )
        );

    

    
    
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nombre: {props.food.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Descripcion: {(props.food.description)}</p>
                <p>Costo: ${(props.food.cost)}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" className='float-left' onClick={() => {
                    createPedido({ info: [props.food._id], cost: props.food.cost })
                }}>
                    Ordenar Solo Este Platillo.
                    </Button>
                <Button variant="success" className='float-left' onClick={() => {
                    setCart(cart.concat(props.food._id));
                    setCartName(cartName.concat(props.food.name));
                    setCostCart(costCart.concat(props.food.cost));
                }}>
                    Carrito.
                    </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Salir.
                    </Button>
            </Modal.Footer>
            {/* Show the food that are in the Cart */}
            {cart.length > 0 &&
                <>
                    <h3>Tu Pedido.</h3>
                    <ul>{listItems}</ul>
                    <ul><strong>Total:</strong> {costCart.reduce(myFunc)}</ul>
                    <Button variant="primary" className='float-left' onClick={() => { createPedido({ info: cart, cost: costCart.reduce(myFunc) }) }}>
                        Ordenar Carrito.
                    </Button>
                </>
            }
        </Modal>
    )
}
export default FoodModal;