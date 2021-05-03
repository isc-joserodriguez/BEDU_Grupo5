import React from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import OrderProgress from '../OrderProgress/OrderProgress'
import classes from './ordercard.module.css'

const OrderCard = (props) => {
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
        (localStorage.getItem('type') === 'chef' && (props.order.status === 1 || props.order.status === 2)) ?
            < Card className={classes.ordercard}>
                <Card.Title>
                    <h4>Pedido #{props.order._id}</h4>
                    <OrderProgress status={props.order.status} ></OrderProgress>
                </Card.Title >
                <Card.Body className={classes.orderBody}>
                    <p><b>Estado: </b> {getStatus(props.order.status)}</p>
                    <p><b>Cliente: </b> {`${props.order.idCliente.firstName} ${props.order.idCliente.lastName}`}</p>
                    <p><b>Chef: </b> {!!props.order.idChef ? `${props.order.idChef?.firstName} ${props.order.idChef?.lastName}` : 'Sin asignar'}</p>
                    <p><b>Mesero: </b> {!!props.order.idMesero ? `${props.order.idMesero?.firstName} ${props.order.idMesero?.lastName}` : 'Sin asignar'}</p>
                    <p><b>Costo: </b> ${(props.order.cost)}</p>
                </Card.Body>
                <Card.Footer className={classes.orderFooter}>
                    {'NA' !== status &&
                        <Button className={classes.actionButton} onClick={() => props.changeStatusHandler(props.order._id)} disabled={props.loading}>
                            {getAction(props.order.status)}
                        </Button>}
                </Card.Footer>
            </Card > : null
    )
}
export default OrderCard;