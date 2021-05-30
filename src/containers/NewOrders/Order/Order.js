import React from 'react'
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';
import OrderProgress from '../../../components/UI/OrderProgress/OrderProgress';

import { getStatus } from '../../../shared/utility';

const Order = (props) => {
    return (
        <div className={'col mb-3'}>
            <Card className='text-center'>
                <Card.Header className=''>
                    <h4>Pedido #{props.order._id.substring(props.order._id.length - 7)}</h4>
                    <OrderProgress status={props.order.status}></OrderProgress>
                </Card.Header>
                <Card.Body>
                    <Card.Text className='text-break text-center'>
                        <span className='h6'>Estado:</span>
                        <br />
                        {getStatus(props.order.status)}
                    </Card.Text>
                    <Button variant='info' className='is-centered orderBtn' block onClick={() => { props.setOrder(props.order); props.handleShow(); }}>Ver pedido</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired
}

export default Order