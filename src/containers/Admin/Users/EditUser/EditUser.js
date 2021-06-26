import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../../shared/utility';
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input';
import { CgUser, CgMail, CgPassword } from 'react-icons/cg';
import { editUser, getUserByIdForm } from '../../../../services';

import classes from './EditUser.module.css';

const EditUser = props => {
    const { id } = useParams();
    const owner = id === localStorage.getItem('id');
    const [editForm, setEditForm] = useState({
        firstName: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa nombre(s)',
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
                placeholder: 'Ingresa apellido(s)',
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
                placeholder: 'Ingresa el email',
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
                placeholder: 'Ingresa la contraseña',
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
                placeholder: 'Confirma la contraseña',
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
        type: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'admin', displayValue: 'Administrador' },
                    { value: 'chef', displayValue: 'Chef' },
                    { value: 'mesero', displayValue: 'Mesero' },
                    { value: 'cliente', displayValue: 'Cliente' },
                ]
            },
            value: 'admin',
            validation: {},
            valid: true
        },
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        getUserByIdForm({ id, editForm, setEditForm, updateObject, setLoading, owner })
    }, [])

    const inputChangedHandler = (event, controlName) => {
        let updatedControls = updateObject(editForm, {
            [controlName]: updateObject(editForm[controlName], {
                value: event.target.value,
                valid: (controlName === 'confirmPassword') ? event.target.value === editForm.password.value : checkValidity(event.target.value, editForm[controlName].validation),
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
        setEditForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        const data = {
            firstName: editForm?.firstName?.value,
            lastName: editForm?.lastName?.value,
            email: editForm?.email?.value,
            password: editForm?.password?.value,
            type: editForm?.type?.value
        }
        editUser({
            id,
            data,
            setLoading,
            setErrorMessage,
            history: props.history
        });

    }

    const formElementsArray = [];
    for (let key in editForm) {
        formElementsArray.push({
            id: key,
            config: editForm[key]
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
            <Card className={classes.EditUser}>
                <Card.Body>
                    <h4 className='card-title text-center mb-4 mt-1'>Editar Usuario</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler}>
                        {form}
                        <Row>
                            <Col>
                                <Button className={classes.saveBtn} type='submit' variant='primary' size='lg' block disabled={
                                    owner ?
                                        (!editForm?.firstName?.valid || !editForm?.lastName?.valid || !editForm?.email?.valid || !editForm?.password?.valid || !editForm?.confirmPassword?.valid) :
                                        (!editForm?.password?.valid || !editForm?.confirmPassword?.valid)}> Guardar
                                </Button>
                            </Col>
                            <Col>
                                <Button variant='danger' size='lg' block onClick={() => props.history.push(`/${localStorage.getItem('type')}/users/${id}`)}>
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                        {errorMessage && <p className={`${classes.ErrorMessage} text-center mt-2`}>Error: Verifica los datos ingresados</p>}
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default withRouter(EditUser);
