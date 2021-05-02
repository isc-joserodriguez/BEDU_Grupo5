import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import OrderProgress from '../../../containers/Mesero/OderProgress'

const OrderModal = (props) => {
    const getStatus = (status) => {
        switch (status) {
            case 0: return 'Cancelado';
            case 1: return 'Pendiente';
            case 2: return 'Preparando';
            case 3: return 'Preparado';
            default: return 'Entregado';
        }
    }
    const getAction = (status) => {
        switch (localStorage.getItem('type')) {
            case 'admin':
                if (status === 1) {
                    return 'Cancelar';
                }
                return 'NA'
            case 'chef':
                switch (status) {
                    case 1: return 'Preparar';
                    case 2: return 'Terminar';
                    default: return 'NA';
                }
            default:
                if (status === 3) {
                    return 'Entregar';
                }
                return 'NA';
        }
    }

    let status = 'NA';
    status = getAction(props.order.status);

    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title><h4>Pedido #{props.order._id}</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OrderProgress status={props.order.status} ></OrderProgress>
                <br></br>
                <p>Estado: {getStatus(props.order.status)}</p>
                <p>Cliente: {`${props.order.idCliente.firstName} ${props.order.idCliente.lastName}`}</p>
                <p>Chef: {!!props.order.idChef ? `${props.order.idChef?.firstName} ${props.order.idChef?.lastName}` : 'Sin asignar'}</p>
                <p>Mesero: {!!props.order.idMesero ? `${props.order.idMesero?.firstName} ${props.order.idMesero?.lastName}` : 'Sin asignar'}</p>
                <p>Costo: ${(props.order.cost)}</p>
            </Modal.Body>
            <Modal.Footer>
                {'NA' !== status &&
                    <Button variant='primary' className='float-left' onClick={() => props.changeStatusHandler(props.order._id)} disabled={props.loading}>
                        {getAction(props.order.status)}
                    </Button>}
                <Button variant='secondary' onClick={props.handleClose}>
                    Cerrar
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default OrderModal;