import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../../shared/utility';
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdSubtitles } from 'react-icons/md'
import { editCategory, getCategoryByIdForm } from '../../../../services';

import classes from './EditCategory.module.css';

const EditCategory = props => {
    const { id } = useParams();
    const [editForm, setEditForm] = useState({
        name: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa el nombre de la categoría',
            },
            icon: IoFastFoodOutline,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un nombre'
        },
        description: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa la descripción',
            },
            icon: MdSubtitles,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa una descripción'
        }
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        getCategoryByIdForm({ id, editForm, setEditForm, updateObject, setLoading });
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
            name: editForm?.name?.value,
            description: editForm?.description?.value
        }
        editCategory({
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
            <Card className={classes.EditCategory}>
                <Card.Body>
                    <h4 className='card-title text-center mb-4 mt-1'>Editar Categoría</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler}>
                        {form}
                        <Row>
                            <Col>
                                <Button variant='danger' size='lg' block onClick={() => props.history.push(`/${localStorage.getItem('type')}/categories/${id}`)}>
                                    Cancelar
                                </Button>
                            </Col>
                            <Col>
                                <Button type='submit' className={classes.saveBtn} variant='primary' size='lg' block disabled={!editForm?.name?.valid || !editForm?.description?.valid} >
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                        {errorMessage && <p className={`${classes.ErrorMessage} text-center mt-2`}>Error: Ya existe una categoría con ese nombre</p>}
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default withRouter(EditCategory);
