import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import platilloFavorito from '../../assets/images/platillo_favorito.jpg';
import platilloReciente from '../../assets/images/platillo_reciente.jpg';

function foodCards(props) {
    if(props.category === "recientes"){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={platilloReciente} />
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
                <Card.Img variant="top" src={platilloFavorito} />
                <Card.Body>
                    <Card.Title>Platillo Favorito</Card.Title>
                    <Card.Text>
                        Este es uno de los platillos favoritos.
                        </Card.Text>
                    <Button variant="primary">Ordenar</Button>
                </Card.Body>
            </Card>
        )
    }else if(props.category === ""){
        return (
            <h1></h1>
        )
    }
}

export default foodCards