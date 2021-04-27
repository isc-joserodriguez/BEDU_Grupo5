import React, {useState}  from 'react'
import Pedido from './Pedido'
import Container from 'react-bootstrap/Container'
import OrderModal from './OrderModal'


function Pedidos() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const ordersTest = (
        [ 
            {
                idPedido: '1',
                idCliente: '1',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 75.50,
                status: 1
                /*
                Status
                0 -Cancelado
                1 - Pendiete
                2 - Preparando
                3 - Preparado
                4 - Entregado
                */
            },
            {
                idPedido: '2',
                idCliente: '2',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 75.50,
                status: 1
            },
            {
                idPedido: '3',
                idCliente: '3',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 75.50,
                status: 2
            } ,
            {
                idPedido: '4',
                idCliente: '2',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 75.50,
                status: 3
            },
            {
                idPedido: '5',
                idCliente: '3',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 75.50,
                status: 4
            } ,
            {
                idPedido: '6',
                idCliente: '2',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 240,
                status: 1
            },
            {
                idPedido: '7',
                idCliente: '3',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 30,
                status: 2
            } ,
            {
                idPedido: '8',
                idCliente: '2',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 80.50,
                status: 3
            },
            {
                idPedido: '9',
                idCliente: '3',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 125,
                status: 4
            } ,
            {
                idPedido: '10',
                idCliente: '2',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 40,
                status: 1
            },
            {
                idPedido: '11',
                idCliente: '3',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 50,
                status: 0
            } 
        ]
    )

    const orderDetail = (orderId) => {
        const ordersCopy = ordersTest.filter( id => id === orderId )
        console.log(ordersCopy)
        return ordersCopy
      }

    const ordersMap = (
        ordersTest.map ((order, index) => 
        <Pedido
            key = {order.idPedido}
            idPedido = {order.idPedido}
            idCliente = {order.idCliente}
            idChef = {order.idChef}
            idMesero = {order.idMesero}
            info = {order.info}
            cost = {order.cost}
            status = {order.status}
            orderDetail = {() => orderDetail(index)}
            handleShow = {() => handleShow()}
            handleClose = {() => handleClose()}
        /> )        
    )
   

    return (
            <div className='overflow-auto'>
                <Container className='overflow-auto vh-75'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 overflow-auto'>

                        {ordersMap}
                        
                    </div>    
                </Container>
                <OrderModal show={show} handleShow = {() => handleShow()} handleClose = {() => handleClose()}></OrderModal>
           </div>
        )
}

export default Pedidos