import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'


export class Pedido extends Component {
    state = {
        visible: true
    }

    render() {
        return (
            <div className={`col mb-3 ${this.state.visible ? '' : 'd-none'}`}>
                <Card className='text-center'>
                    <Card.Header className=''><h4>Pedido #{this.props.number}</h4></Card.Header>
                    <Card.Body>
                        <Card.Text className='text-break text-center'>
                            <h6>Estado: </h6>
                            {this.props.estado}
                        </Card.Text>
                        <Button variant="info" className='is-centered' block >Ver pedido</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}


export default Pedido
