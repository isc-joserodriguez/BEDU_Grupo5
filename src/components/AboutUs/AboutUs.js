import React from 'react';

import Links from './Links/Links';

import { Row, Col, Card } from 'react-bootstrap';

import classes from './AboutUs.module.css';

import imgAdrian from '../../assets/images/man1.jpg';
import imgNathaly from '../../assets/images/woman.jpg';
import imgJose from '../../assets/images/joserodriguez.jpg';
import imgDiego from '../../assets/images/man2.jpg';

const AboutUs = () => {
    const info = [
        {
            id: 1,
            name: 'Adrian Barros',
            resume: 'Ingeniero Industrial',
            img: imgAdrian,
            sites: [
                { site: 'linkedin', url: 'https://www.github.com' },
                { site: 'github', url: 'https://www.github.com' },
                { site: 'web', url: 'https://www.github.com' }
            ]
        },
        {
            id: 2,
            name: 'Nathaly Dimas',
            resume: 'Ingeniero en Sistemas Computacionales',
            img: imgNathaly,
            sites: [
                { site: 'linkedin', url: 'https://www.github.com' },
                { site: 'github', url: 'https://www.github.com' },
                { site: 'web', url: 'https://www.github.com' }
            ]
        },
        {
            id: 3,
            name: 'José Rodriguez',
            resume: 'Desarrollador Full Stack con 2 años y medio de experiencia con stack MEAN y MERN.',
            img: imgJose,
            sites: [
                { site: 'linkedin', url: 'https://www.linkedin.com/in/isc-joserodriguez/' },
                { site: 'github', url: 'https://github.com/joanrodriguezhe' },
                { site: 'web', url: 'https://joanrodriguezhe.github.io/' }
            ]
        },
        {
            id: 4,
            name: 'Diego Sandoval',
            resume: 'Ingeniero en Sistemas Computacionales',
            img: imgDiego,
            sites: [
                { site: 'linkedin', url: 'https://www.github.com' },
                { site: 'github', url: 'https://www.github.com' },
                { site: 'web', url: 'https://www.github.com' }
            ]
        },
    ]
    return (
        <>
            <Row className={classes.AboutUs}>
                <Col className='text-center py-5'>
                    <h3>Grupo 5 | Restaurant Manager</h3>
                    <p>
                        Este proyecto fue hecho con React.js en el front y con mongo, express y node en el back (MERN Stack).
                        <br />
                        El objetivo de este proyecto es llevar a cabo todas las fases de un restaurante, tomando los roles de Administrador, Chef, Mesero y Cliente.
                    </p>
                </Col>
            </Row>
            <Row className='w-100'>
                <Col className='text-center mt-3'>
                    <h3>Equipo</h3>
                </Col>
            </Row>
            <Row className='w-100 m-0'>
                {
                    info.map(member => (
                        <Col key={member.id} className='text-center py-5' xs={6} sm={6} md={6} lg={3}>
                            <Card style={{ height: '100%' }}>
                                <Card.Img variant="top" src={member.img} />
                                <Card.Body>
                                    <Card.Title>{member.name}</Card.Title>
                                    <Card.Text>
                                        {member.resume}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className={`px-5 d-flex justify-content-around`}>
                                    <Links sites={member.sites} />
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                    )
                }
            </Row>
        </>
    )
}

export default AboutUs;