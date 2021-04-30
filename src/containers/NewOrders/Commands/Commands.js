import React from 'react'
import { Button, Container, Form, Col } from 'react-bootstrap'

const Commands = () => {
    return (
        <Container className='mb-4'>
            <div className='d-flex align-items-center mb-4 justify-content-center'>
                <Form>
                    <Col>
                        <Form.Control type='text' placeholder='No. de pedido' />
                    </Col>
                </Form>
                <Button variant='dark' className='p-2' >Buscar</Button>
            </div>
            <div className='col d-flex flex-wrap mb-4 align-content-center justify-content-center'>
                <Button variant='outline-primary' className='p-2 m-2' >Pendiente</Button>
                <Button variant='outline-warning' className='p-2 m-2' >En preparación</Button>
                <Button variant='outline-success' className='p-2 m-2' >Preparado</Button>
                <Button variant='outline-danger' className='p-2  m-2' >Entregado</Button>
                <Button variant='outline-secondary' className='p-2 m-2' >Todos</Button>
            </div>
        </Container>
    )
}

export default Commands
