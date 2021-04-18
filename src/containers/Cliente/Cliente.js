import { React, Fragment, useState } from 'react'
import FoodCards from './FoodCards'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap'

function Cliente() {

    const [category, setValue] = useState('recientes');

    function menuAppers(e, foodCategory) {
        e.preventDefault();
        setValue(foodCategory);
    }


    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home" onClick={(e) => menuAppers(e, "recientes")}>Rest - aurante!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#favoritos" onClick={(e) => menuAppers(e, "favoritos")}>Favoritos.</Nav.Link>
                        <Nav.Link href="#recientes" onClick={(e) => menuAppers(e, "recientes")}>Recientes.</Nav.Link>
                        <Nav.Link href="#promociones">Promociones.</Nav.Link>
                        <Nav.Link href="#extras">Extras.</Nav.Link>
                        <NavDropdown title="Categorias." id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Desayunos.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Comidas.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Cenas.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Saludable.</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.5">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <FoodCards category = {category}/>
        </Fragment>
    );
}


export default Cliente
