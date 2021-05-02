import React from 'react'
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
                    <Button variant='info' className='is-centered' block onClick={() => orderDetails()}>Ver pedido</Button>
                </Card.Body>
            </Card>

        </div>
    )
}



export default Order
