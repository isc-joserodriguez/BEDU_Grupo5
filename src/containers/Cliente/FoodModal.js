import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
const FoodModal = (props) => {

    /*/{* <p>Info: {(props.order.info)}</p> */

    console.log(props.food)

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
                    <Button variant="primary" className='float-left' onClick={props.handleClose}>
                        Ordenar.
                    </Button>
                    <Button variant="success" className='float-left' onClick={props.handleClose}>
                        Favoritos.
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