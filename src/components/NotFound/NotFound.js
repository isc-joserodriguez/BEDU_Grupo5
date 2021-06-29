import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Image } from 'react-bootstrap';

import Error404 from '../../assets/images/Error404.png';

const NotFound = (props) => {
    return (
        <Container>
            <div className='text-right'>
                <Button variant='danger' className='mt-3' onClick={() => { props.history.goBack(); }}>Ir atrás</Button>
            </div>
            <div className='text-center'>
                <Image src={Error404} alt='Error 404' />
            </div>
        </Container>
    )
}

export default withRouter(NotFound)
