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

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pedido #{props.key}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Estatus: {orderStatus(props.status)}</p>
                    <p>Cliente: {(props.idCliente)}</p>
                    <p>Chef: {(props.idChef)}</p>
                    <p>Mesero: {(props.idMesero)}</p>
                    <p>Info: {(props.info)}</p>
                    <p>Costo: ${(props.cost)}</p>
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
        </>
    )
}

export default OrderModal
