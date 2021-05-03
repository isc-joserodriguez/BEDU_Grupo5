import React from 'react'
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap'
import OrderProgress from '../../../../components/UI/OrderProgress/OrderProgress'

const Order = (props) => {
    const orderStatus = (status) => {
        switch (status) {
            case 0: return 'Cancelado';
            case 1: return 'Pendiente';
            case 2: return 'Preparando';
            case 3: return 'Preparado';
            case 4: return 'Entregado';
            default: return 'Pendiente';
        }
    }

    const orderDetails = () => {
        props.orderDetail()
        props.handleShow()
    }


    return (
        <div className={'col mb-3'}>
            <Card className='text-center'>
                <Card.Header className=''>
                    <h4>Pedido #{props.idPedido}</h4>
                    <OrderProgress status={props.status}></OrderProgress>
                </Card.Header>
                <Card.Body>
                    <Card.Text className='text-break text-center'>
                        <span className='h6'>Estado:</span>
                        <br />
                        {orderStatus(props.status)}
                    </Card.Text>
                    <Button variant='info' className='is-centered orderBtn' block onClick={() => orderDetails()}>Ver pedido</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

Order.propTypes = {
    cost: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
    idChef: PropTypes.object.isRequired,
    idCliente: PropTypes.object.isRequired,
    idPedido: PropTypes.string.isRequired,
    info: PropTypes.array.isRequired,
    orderDetail: PropTypes.func.isRequired,
    status: PropTypes.number.isRequired
}

export default Order