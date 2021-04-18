import { React } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import platilloFavorito from '../../assets/images/platillo_favorito.jpg';
import platilloReciente from '../../assets/images/platillo_reciente.jpg';

const arrayRecientes = ["Platiilo 1", "Nuevo Platillo Pruebalo", "Platillo 2", "Platillo Nuevo"]
const arrayFavorites = ["Platillo 1", "Nuestro Platillo Favorito", "Platillo 2", "Un Clasico"]

function DrawFoodCards(props) {
    if(props.category === "recientes"){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={platilloReciente} />
            <Card.Body>
                <Card.Title>{arrayRecientes[props.index]}</Card.Title>
                <Card.Text>
                    {arrayRecientes[props.index + 1]}
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
                    <Card.Title>{arrayFavorites[props.index]}</Card.Title>
                    <Card.Text>
                        {arrayFavorites[props.index + 1]}
                    </Card.Text>
                    <Button variant="primary">Ordenar</Button>
                </Card.Body>
            </Card>
        )
    }
}

function RepeatFoodCards(props) {
    if (props.category === "recientes") {
        for (var index = 0; index < arrayRecientes.length; index++) {
            return (
                <Container>
                    <Row className="mt-3">
                        <Col><DrawFoodCards index={index} category = {props.category} /></Col>
                        <Col><DrawFoodCards index={index + 2} category = {props.category} /></Col>
                    </Row>
                </Container>
            )
        }
    } else if (props.category === "favoritos") {
        for (index = 0; index < arrayFavorites.length; index++) {
            return (
                <Container>
                    <Row className="mt-3">
                        <Col><DrawFoodCards index={index} category = {props.category} /></Col>
                        <Col><DrawFoodCards index={index + 2} category = {props.category} /></Col>
                    </Row>
                </Container>
            )
        }
    }
}

function foodCards(props) {
    return <RepeatFoodCards category = {props.category}/>
}

export default foodCards