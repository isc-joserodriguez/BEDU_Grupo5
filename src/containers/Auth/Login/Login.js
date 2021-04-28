import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateObject, checkValidity } from '../../../shared/utility';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import { CgMail, CgPassword } from 'react-icons/cg';
import { login } from '../../../services';

import classes from './Login.module.css';

const Login = props => {
    console.log(props)
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'group',
            elementConfig: {
                type: 'email',
                placeholder: 'Ingresa tu email',
            },
            icon: CgMail,
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un email válido'
        },
        password: {
            elementType: 'group',
            elementConfig: {
                type: 'password',
                placeholder: 'Ingresa tu contraseña',
            },
            icon: CgPassword,
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa una contraseña válida'
        }
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    if (props.isAuthenticated) props.history.push(`/${localStorage.getItem('type')}`);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(loginForm, {
            [controlName]: updateObject(loginForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, loginForm[controlName].validation),
                touched: true
            })
        });
        setLoginForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        let data = { email: loginForm.email.value, password: loginForm.password.value }
        login({
            data,
            setLoading,
            setToken: props.setToken,
            setErrorMessage
        });
    }

    const formElementsArray = [];

    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key]
        })
    }

    let form = !loading ? formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            icon={formElement.config.icon}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            errorMessage={formElement.config.errorMessage}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    )) : <Spinner />;

    return (
        <Container>
            <Card className={classes.Login}>
                <Card.Body>
                    <h4 className="card-title text-center mb-4 mt-1">Inicio de sesión</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler}>
                        {form}
                        <Button type="submit" variant="primary" size="lg" block disabled={!loginForm.email.valid || !loginForm.password.valid}> Iniciar Sesión  </Button>
                        {errorMessage && <p className={`${classes.ErrorMessage} text-center mt-2`}>Error: Verifica las credenciales</p>}
                        <p className="text-center mt-4">¿No tienes cuenta? <Link to="/signup">Registrate</Link></p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setToken: PropTypes.func.isRequired,
}

export default withRouter(Login)
