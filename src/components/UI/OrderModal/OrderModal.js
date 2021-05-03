import React from 'react'
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import OrderProgress from '../OrderProgress/OrderProgress'
import classes from './orderModal.module.css'

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
            case 'mesero':
                if (status === 3) {
                    return 'Entregar';
                }
            default:
                return 'NA';
        }
    }

    let status = 'NA';
    status = getAction(props.order.status);
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false} className={classes.ordercard}>
            <Modal.Header closeButton>
                <Modal.Title><h4>Pedido #{props.order._id}</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body className={classes.orderBody}>
                <OrderProgress status={props.order.status} ></OrderProgress>
                <br></br>
                <p><b>Estado: </b>{getStatus(props.order.status)}</p>
                <p><b>Cliente: </b>{`${props.order.idCliente.firstName} ${props.order.idCliente.lastName}`}</p>
                <p><b>Chef: </b>{!!props.order.idChef ? `${props.order.idChef?.firstName} ${props.order.idChef?.lastName}` : 'Sin asignar'}</p>
                <p><b>Mesero: </b>{!!props.order.idMesero ? `${props.order.idMesero?.firstName} ${props.order.idMesero?.lastName}` : 'Sin asignar'}</p>
                <p><b>Costo: </b>${(props.order.cost)}</p>
            </Modal.Body>
            <Modal.Footer className={classes.orderFooter}>
                {'NA' !== status &&
                    <Button variant='primary' className={classes.actionButton} onClick={() => { props.changeStatusHandler(props.order._id); props.handleClose(); }} disabled={props.loading}>
                        {getAction(props.order.status)}
                    </Button>}

                <Button className={classes.secondaryButton} onClick={props.handleClose}>
                    Cerrar
                    </Button>
            </Modal.Footer>
        </Modal >
    )
}
OrderModal.propTypes = {
    order: PropTypes.object.isRequired,
    handleShow: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    changeStatusHandler: PropTypes.func.isRequired
}
export default OrderModal;