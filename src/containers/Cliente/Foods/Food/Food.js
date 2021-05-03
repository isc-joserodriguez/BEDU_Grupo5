import React from 'react'
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap'
import classes from './Food.module.css'


const Food = (props) => {

    const foodDetails = () => {
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
                        <img style={{ width: "50%", heigth: "20%" }} src={props.image} alt="Platillos De Comida" />
                    </Card.Text>
                    <Button variant="info" className={classes.Button} block onClick={() => foodDetails()}>Ver Platillo</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

Food.propTypes = {
    cost: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    foodDetail: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
    idFood: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Food