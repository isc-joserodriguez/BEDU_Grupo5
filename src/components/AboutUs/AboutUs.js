import React from 'react';

import Links from './Links/Links';

import { Row, Col, Card, Image } from 'react-bootstrap';
import { RiGithubFill } from "react-icons/ri";

import classes from './AboutUs.module.css';

import imgAdrian from '../../assets/images/adrian.jpeg';
import imgNathaly from '../../assets/images/nathaly.jpeg';
import imgJose from '../../assets/images/joserodriguez.jpg';
import imgDiego from '../../assets/images/diego.jpg';
import Logo from '../../assets/images/Logo.svg';

const AboutUs = () => {
    const info = [
        {
            id: 1,
            name: 'Adrian Barros',
            resume: 'Ingeniero Industrial',
            img: imgAdrian,
            sites: [
                { site: 'linkedin', url: 'https://www.linkedin.com/in/adrian-barros-175b26162/' },
                { site: 'github', url: '' }
            ]
        },
        {
            id: 2,
            name: 'Nathaly Dimas',
            resume: 'Ingeniera en sistemas computacionales, actualmente project manager en una empresa de desarrollo de software, también he participado en otros proyectos como desarrolladora web.',
            img: imgNathaly,
            sites: [
                { site: 'linkedin', url: 'https://www.linkedin.com/in/nathaly-narajham-dimas-cisneros-5472a7133/' },
                { site: 'github', url: 'https://www.github.com' }
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
                { site: 'linkedin', url: 'https://www.linkedin.com/in/diego-sandoval-vargas-8685b5192/' },
                { site: 'github', url: 'https://github.com/diegosv6910' }
            ]
        },
    ]
    return (
        <>
            <Row className={classes.AboutUs}>
                <Col className='text-center py-5'>
                    <Image className='mb-3' src={Logo} style={{width:'120px',heigth:'120px'}} />
                    <p>
                        Este proyecto fue hecho con React.js en el front y con mongo, express y node en el back (MERN Stack).
                        <br />
                        El objetivo de este proyecto es llevar a cabo todas las fases de un restaurante, tomando los roles de Administrador, Chef, Mesero y Cliente.
                    </p>
                    <h5 className='my-4'>Repositorios</h5>
                    <Row>
                        <Col className='text-right px-5'>
                            <a className={classes.Repo} href='https://github.com/joanrodriguezhe/BEDU_Grupo5' target='_blank'>Front-end <RiGithubFill className='my-auto' /></a>
                        </Col>
                        <Col className='text-left px-5'>
                            <a className={classes.Repo} href='https://github.com/joanrodriguezhe/BEDU_Grupo11_Backend' target='_blank'>Back-end <RiGithubFill className='my-auto' /></a>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='w-100 m-0'>
                <Col className='text-center mt-3'>
                    <h3>Grupo 5</h3>
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