import React from 'react'
import { Card, Button } from 'react-bootstrap'


function Food (props) {

        function foodDetails(){
            props.foodDetail()
            props.handleShow()
        }

        return (
            <div className={'col mb-3'}>
                <Card className='text-center'>
                    <Card.Header className=''><h4>Nombre: </h4>
                    {props.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className='text-break text-center'>
                        <img style={{width: "50%", heigth: "20%"}} src={props.image}/>
                        </Card.Text>
                        <Button variant="info" className='is-centered' block onClick={() => foodDetails()}>Ver Platillo</Button>
                    </Card.Body>
                </Card>
                
            </div>
        )
    }



export default Food
