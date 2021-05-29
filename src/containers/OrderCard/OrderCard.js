import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Card, Accordion, Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { MdExpandMore } from 'react-icons/md';
import ToggleButton from './ToggleButton/ToggleButton';
import OrderProgress from '../../components/UI/OrderProgress/OrderProgress'

import classes from './ordercard.module.css'

const OrderCard = (props) => {
    const [showCard, setShowCard] = useState(false);
    const toggleShowCard = () => {
        setShowCard(!showCard);
    }
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
    let showed = false;
    switch (localStorage.getItem('type')) {
        case 'chef':
            showed = (props.order.status === 1 || props.order.status === 2);
            break;
        case 'cliente':
            showed = (props.order.status !== 4);
            break;
        default:
            showed = false;
            break;
    }

    return (
        showed ?
            <Accordion>
                <Card className={classes.ordercard}>
                    <div className='ml-auto'>
                        <ToggleButton
                            toggleShowCard={toggleShowCard}
                            showed={showCard}
                            eventKey="0"
                        />
                    </div>
                    <Card.Title>
                        <h4>Pedido #{props.order._id}</h4>
                        <OrderProgress status={props.order.status} />
                    </Card.Title >
                    <Accordion.Collapse eventKey='0'>

                        <Card.Body className={classes.orderBody}>
                            <p><b>Estado: </b> {getStatus(props.order.status)}</p>
                            <p><b>Cliente: </b> {`${props.order.idCliente.firstName} ${props.order.idCliente.lastName}`}</p>
                            <p><b>Chef: </b> {!!props.order.idChef ? `${props.order.idChef?.firstName} ${props.order.idChef?.lastName}` : 'Sin asignar'}</p>
                            <p><b>Mesero: </b> {!!props.order.idMesero ? `${props.order.idMesero?.firstName} ${props.order.idMesero?.lastName}` : 'Sin asignar'}</p>
                            <p><b>Costo: </b> ${(props.order.cost)}</p>
                            <hr></hr>
                            <h5><b>Detalle del pedido:</b></h5>
                            <br />
                            {props.order.info ? props.order.info.map((order, index) => (
                                <p key={index}><b>{order.name}</b>
                                    <br />
                                    {order.description}
                                </p>
                            )) : null
                            }

                        </Card.Body>
                    </Accordion.Collapse>

                    {'NA' !== status &&
                        <Card.Footer className={classes.orderFooter} style={{ width: '100%' }}>
                            <Button className={classes.actionButton} onClick={() => props.changeStatusHandler(props.order._id)} disabled={props.loading}>
                                {getAction(props.order.status)}
                            </Button>
                        </Card.Footer>
                    }

                </Card >
            </Accordion>
            : null
    )
}
OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    changeStatusHandler: PropTypes.func.isRequired
}

export default OrderCard;