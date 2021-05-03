import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

import { updateObject, checkValidity } from '../../../../shared/utility';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdSubtitles } from 'react-icons/md'

import { createCategory } from '../../../../services';

import classes from './NewCategory.module.css';

const NewCategory = props => {
    const [newCategoryForm, setNewCategoryForm] = useState({
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
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(newCategoryForm, {
            [controlName]: updateObject(newCategoryForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, newCategoryForm[controlName].validation),
                touched: true
            })
        });
        setNewCategoryForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        const data = {
            name: newCategoryForm.name.value,
            description: newCategoryForm.description.value,
        }

        createCategory({
            data,
            history: props.history,
            setLoading,
            setErrorMessage
        });
    }

    const formElementsArray = [];
    for (let key in newCategoryForm) {
        formElementsArray.push({
            id: key,
            config: newCategoryForm[key]
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
            <Card className={classes.NewCategory}>
                <Card.Body>
                    <h4 className='card-title text-center mb-4 mt-1'>Nueva Categoría</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler} className="d-flex flex-column">
                        {form}
                        <Button
                            type='submit'
                            variant='primary'
                            size='lg'
                            block
                            disabled={!newCategoryForm.name.valid || !newCategoryForm.description.valid}
                        >
                            Guardar
                        </Button>
                        {errorMessage && <p className={`${classes.ErrorMessage} text-center mt-2`}>Error: Verifica los datos ingresados</p>}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default withRouter(NewCategory)
