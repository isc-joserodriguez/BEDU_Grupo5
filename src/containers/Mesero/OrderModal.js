import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
const OrderModal = (props) => {
    function orderStatus (status) {
        switch (status){
            case 0: return 'Cancelado';
            case 1: return 'Pendiente';
            case 2: return 'Preparando';
            case 3: return 'Preparado';
            case 4: return 'Entregado';
            default: return 'Pendiente';
        }
    }

    /*/{* <p>Info: {(props.order.info)}</p> */

    console.log(props.order)

    return (
        <>
        
        
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pedido #{props.order._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Estatus: {orderStatus(props.order.status)}</p>
                    <p>Cliente: {(props.order.idCliente)}</p>
                    <p>Chef: {(props.order.idChef)}</p>
                    <p>Mesero: {(props.order.idMesero)}</p>
                   
                    <p>Costo: ${(props.order.cost)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='float-left' onClick={props.handleClose}>
                        Accion 1
                    </Button>
                    <Button variant="success" className='float-left' onClick={props.handleClose}>
                        Acción 2
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
             </Modal>
        
        <div>
            Modal
        </div>
        </>
    )
}
export default OrderModal;