import React from 'react'
import { Card, Button } from 'react-bootstrap'


function Pedido (props) {
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

        function orderDetails(){
            props.orderDetail()
            props.handleShow()
        }

        return (
            <div className={'col mb-3'}>
                <Card className='text-center'>
                    <Card.Header className=''><h4>Pedido #{props.idPedido}</h4></Card.Header>
                    <Card.Body>
                        <Card.Text className='text-break text-center'>
                            <h6>Estado: </h6>
                            {orderStatus(props.status)}
                        </Card.Text>
                        <Button variant="info" className='is-centered' block onClick={() => orderDetails()}>Ver pedido</Button>
                    </Card.Body>
                </Card>
                
            </div>
        )
    }



export default Pedido
