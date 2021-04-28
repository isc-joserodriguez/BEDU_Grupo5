import React, { Component } from 'react'
import Pedido from './Pedido'
import Container from 'react-bootstrap/Container'


export class Pedidos extends Component {
    render() {
        return (
            <div className='overflow-auto'>
                <Container className='overflow-auto vh-75'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 overflow-auto'>
                        
                            <Pedido number={1} estado={'Pendiente'} ></Pedido>
                            <Pedido number={2} estado={'En preparación'} ></Pedido>
                            <Pedido number={3} estado={'Entregado'} ></Pedido>
                            <Pedido number={4} estado={'Pendiente'} ></Pedido>
                            <Pedido number={5} estado={'En preparación'} ></Pedido>
                            <Pedido number={6} estado={'Entregado'} ></Pedido>
                            <Pedido number={7} estado={'Pendiente'} ></Pedido>
                            <Pedido number={8} estado={'En preparación'} ></Pedido>
                            <Pedido number={9} estado={'Entregado'} ></Pedido>
                            <Pedido number={10} estado={'Pendiente'} ></Pedido>
                            <Pedido number={11} estado={'En preparación'} ></Pedido>
                            <Pedido number={12} estado={'Entregado'} ></Pedido>
                            <Pedido number={13} estado={'Pendiente'} ></Pedido>
                            <Pedido number={14} estado={'En preparación'} ></Pedido>
                            <Pedido number={15} estado={'Entregado'} ></Pedido>
                            <Pedido number={16} estado={'Preparado'} ></Pedido>
                            <Pedido number={17} estado={'Preparado'} ></Pedido>
                            <Pedido number={18} estado={'Preparado'} ></Pedido>
                            <Pedido number={19} estado={'En preparación'} ></Pedido>
                            <Pedido number={20} estado={'Entregado'} ></Pedido>
                            <Pedido number={21} estado={'Pendiente'} ></Pedido>

                    </div>    
                </Container>
           </div>
        )
    }
}


export default Pedidos