import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateObject, checkValidity } from '../../../shared/utility';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import { CgUser, CgMail, CgPassword } from 'react-icons/cg';
import { signup } from '../../../services';
import LoginBackground4 from '../../../assets/images/backLogin4.jpg';

import classes from './SignUp.module.css';

const SignUp = props => {
    const [signupForm, setSignupForm] = useState({
        firstName: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa tu(s) nombre(s)',
            },
            icon: CgUser,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un nombre'
        },
        lastName: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa tu(s) apellido(s)',
            },
            icon: CgUser,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un apellido'
        },
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
        },
        confirmPassword: {
            elementType: 'group',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirma tu contraseña',
            },
            icon: CgPassword,
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Las contraseñas no coinciden'
        },
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    if (props.isAuthenticated) props.history.push(`/${localStorage.getItem('type')}`);

    const inputChangedHandler = (event, controlName) => {
        let updatedControls = updateObject(signupForm, {
            [controlName]: updateObject(signupForm[controlName], {
                value: event.target.value,
                valid: (controlName === 'confirmPassword') ? event.target.value === signupForm.password.value : checkValidity(event.target.value, signupForm[controlName].validation),
                touched: true
            })
        });
        if (controlName === 'password' && updatedControls.confirmPassword.value) {
            updatedControls = updateObject(updatedControls, {
                confirmPassword: updateObject(updatedControls.confirmPassword, {
                    valid: event.target.value === updatedControls.confirmPassword.value
                })
            });
        }
        setSignupForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        const data = {
            firstName: signupForm.firstName.value,
            lastName: signupForm.lastName.value,
            email: signupForm.email.value,
            password: signupForm.password.value
        }

        signup({
            data,
            setLoading,
            setToken: props.setToken,
            setErrorMessage,
            register: false
        });
    }

    const formElementsArray = [];
    for (let key in signupForm) {
        formElementsArray.push({
            id: key,
            config: signupForm[key]
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
        <section className={classes.LoginBackground} style={{ backgroundImage: `url(${LoginBackground4})` }}>
            <Container>
                <Card className={classes.Signup}>
                    <Card.Body>
                        <h4 className='card-title text-center mb-4 mt-1'>Registro</h4>
                        <hr />
                        <Form noValidate onSubmit={submitHandler}>
                            {form}
                            <Button type='submit' variant='primary' size='lg' block disabled={!signupForm.firstName.valid || !signupForm.lastName.valid || !signupForm.email.valid || !signupForm.password.valid || !signupForm.confirmPassword.valid}> Registrarse  </Button>
                            {errorMessage && <p className={`${classes.ErrorMessage} text-center mt-2`}>Error: Verifica los datos ingresados</p>}
                            <p className='text-center mt-4'>Ya estás registrado? <Link to='/'>Inicia sesión</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    )
}

SignUp.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setToken: PropTypes.func.isRequired,
}

export default withRouter(SignUp)
