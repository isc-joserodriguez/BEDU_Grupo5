import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

function foodCards(props) {
    if(props.category === "recientes"){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Platillo Reciente</Card.Title>
                <Card.Text>
                    Este es uno de nuestros nuevos platillos.
                    </Card.Text>
                <Button variant="primary">Ordenar</Button>
            </Card.Body>
        </Card>
    )
    }else if(props.category === "favoritos"){
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Platillo Favorito</Card.Title>
                    <Card.Text>
                        Este es uno de los platillos favoritos.
                        </Card.Text>
                    <Button variant="primary">Ordenar</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default foodCards