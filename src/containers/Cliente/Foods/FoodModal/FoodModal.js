import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { createPedido } from '../../../../services/foods'
const FoodModal = (props) => {
    const [cart, setCart] = useState([]);
    const myFunc = (total, num) => total + num;

    const createOrder = (info, cost) => {
        createPedido({ info, cost });
        props.handleClose();
        setCart([]);
    }

    const addFood = () => {
        setCart(cart.concat({
            _id: props.food._id,
            name: props.food.name,
            cost: props.food.cost
        }
        ));
    }

    const deleteFoodFromCart = (i) => {
        console.log('el index es: '+ i)
        var newarray = [...cart]
        if(i !== 0){
            newarray.splice(0, i)
        }else{
            newarray.shift()
        } 
        setCart(newarray)
    }


    const listItems = cart.map((food, index) =>
        <>
        <Table>
        <tbody>
        <tr>
        <td>{index}</td>
        <td>{food.name}</td>
        <td>{food.cost}</td>
        <td><Button variant="success" className='float-left' onClick={() => { deleteFoodFromCart(index) }}>Eliminar De Carrito</Button></td>
        </tr>
        </tbody>
        </Table>
        </>
        //  <li key={food._id}>{`Producto: ${food.name} Precio: ${food.cost}`}</li>
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
                {
                    (cart.length < 2) &&
                    <Button variant="primary" className='float-left' onClick={() => { createOrder([props.food._id], props.food.cost) }}>
                        Ordenar Solo Este Platillo
                    </Button>
                }

                <Button variant="success" className='float-left' onClick={addFood}>
                    Agregar a Carrito
                </Button>
                <Button variant="secondary" onClick={props.handleClose}> Salir. </Button>
            </Modal.Footer>
            {/* Show the food that are in the Cart */}
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
                    </Table>
                    <ul>{listItems}</ul>
                    <ul><strong>Total:</strong> {cart.map(el => el.cost).reduce(myFunc)}</ul>

                    <Button variant="primary" className='float-left' onClick={() => { createOrder(cart.map(el => el._id), cart.map(el => el.cost).reduce(myFunc)) }}>
                        Ordenar Carrito
                    </Button>
                </>
            }
        </Modal>
    )
}
export default FoodModal;