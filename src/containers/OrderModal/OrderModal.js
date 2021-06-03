import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OrderProgress from '../../components/UI/OrderProgress/OrderProgress';
import Spinner from '../../components/UI/Spinner/Spinner';

import { getAction, getStatus } from '../../shared/utility';
import { getOrderById } from '../../services';

import classes from './orderModal.module.css'

const OrderModal = (props) => {
    const { orderID } = props;
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const status = getAction(localStorage.getItem('type'), order?.status);

    const actionHandler = () => {
        props.changeStatusHandler(order._id).then(res => {
            setOrder(res)
        })
        props.handleClose();
    }

    const orderDetail = (orderId) => {
        setLoading(true);
        getOrderById(
            {
                id: orderId,
                setOrder,
                setLoading
            }
        )
    };

    useEffect(() => {
        if (orderID) orderDetail(orderID);
    }, [orderID])

    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false} className={classes.ordercard}>
            {loading ?
                <Spinner /> :
                <>
                    <Modal.Header closeButton className={classes.orangeBackground}>
                        <Modal.Title><h4>Pedido #{order._id}</h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={classes.orderBody}>
                        <OrderProgress status={order.status} ></OrderProgress>
                        <br></br>
                        <p><b>Estado: </b>{getStatus(order.status)}</p>
                        <p><b>Cliente: </b>{`${order.idCliente.firstName} ${order.idCliente.lastName}`}</p>
                        <p><b>Chef: </b>{!!order.idChef ? `${order.idChef?.firstName} ${order.idChef?.lastName}` : 'Sin asignar'}</p>
                        <p><b>Mesero: </b>{!!order.idMesero ? `${order.idMesero?.firstName} ${order.idMesero?.lastName}` : 'Sin asignar'}</p>
                        <p><b>Costo: </b>${(order.cost)}</p>
                        <hr></hr>
                        <h5><b>Detalle del pedido:</b></h5>
                        <br />
                        {order.info ? order.info.map((order, index) => (
                            <p key={index}><b className={classes.nameOrange}>{order.name}</b>
                                <br />
                                {order.description}
                            </p>
                        )) : null
                        }

                    </Modal.Body>
                    <Modal.Footer className={classes.orderFooter}>
                        {'NA' !== status &&
                            <Button variant='primary' className={classes.actionButton} onClick={actionHandler} disabled={loading}>
                                {status}
                            </Button>}

                        <Button className={classes.secondaryButton} onClick={props.handleClose}>
                            Cerrar
                    </Button>
                    </Modal.Footer>
                </>}
        </Modal >
    )
}
OrderModal.propTypes = {
    orderID: PropTypes.string,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    changeStatusHandler: PropTypes.func.isRequired
}
export default OrderModal;