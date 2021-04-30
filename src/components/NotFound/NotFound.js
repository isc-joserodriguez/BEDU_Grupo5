import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import Error404 from '../../assets/images/Error404.png';

const NotFound = (props) => {
    return (
        <Container>
            <div style={{ textAlign: 'right' }}>
            <Button variant='danger' className='ml-auto' onClick={() => { props.history.goBack(); }}>Ir atrás</Button>
            </div>
            <div style={{ textAlign: 'center' }}>
                <img src={Error404} alt='Error 404' className='mx-auto' style={{ height: '90vh' }} />
            </div>
        </Container>
    )
}

export default withRouter(NotFound)
