import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { createPedido } from '../../services/foods'
const FoodModal = (props) => {

    const [cart, setCart] = useState([]);
    const [costCart, setCostCart] = useState([]);

    console.log(cart)

    function myFunc(total, num) {
        return total + num;
    }


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nombre: {props.food.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Descripcion: {(props.food.description)}</p>
                    <p>Costo: ${(props.food.cost)}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" className='float-left' onClick={() => {setCart(cart.concat(props.food._id)); createPedido({ info: cart, cost: costCart.reduce(myFunc)}) }}>
                        Ordenar.
                    </Button>
                    <Button variant="success" className='float-left' onClick={() => {setCart(cart.concat(props.food._id)); setCostCart(costCart.concat(props.food.cost)) }}>
                        Carrito.
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Salir.
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default FoodModal;