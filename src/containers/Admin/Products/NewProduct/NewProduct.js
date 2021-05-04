import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../../shared/utility';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdSubtitles, MdAttachMoney, MdImage } from 'react-icons/md'
import { createProduct, getCategoriesSelector } from '../../../../services';

import { Image } from 'react-bootstrap';

import classes from './NewProduct.module.css';

const NewProduct = (props) => {
    const [newProductForm, setNewProductForm] = useState({
        name: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa el nombre del producto',
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
        category: {
            elementType: 'select',
            elementConfig: {
                options: [{ value: '', displayValue: 'Cargando categorías...' }]
            },
            value: '',
            validation: {},
            valid: true
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
        },
        cost: {
            elementType: 'group',
            elementConfig: {
                type: 'number',
                placeholder: 'Ingresa el costo',
            },
            icon: MdAttachMoney,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa el costo'
        },
        image: {
            elementType: 'group',
            elementConfig: {
                type: 'url',
                placeholder: 'Ingresa enlace de la imagen',
            },
            icon: MdImage,
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa una imagen'
        },
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);


    useEffect(() => {
        getCategoriesSelector({ editForm: newProductForm, setEditForm: setNewProductForm, setLoading, updateObject });
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(newProductForm, {
            [controlName]: updateObject(newProductForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, newProductForm[controlName].validation),
                touched: true
            })
        });
        setNewProductForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        const data = {
            name: newProductForm.name.value,
            idCategoria: newProductForm.category.value,
            description: newProductForm.description.value,
            cost: newProductForm.cost.value,
            image: newProductForm.image.value
        }

        createProduct({
            data,
            history: props.history,
            setLoading,
            setErrorMessage
        });
    }

    const imageErrorHandler = (event) => {
        event.target.src = 'https://www.ninjaseo.com.au/wp-content/uploads/2016/07/placeholder4.png'
    }

    const formElementsArray = [];
    for (let key in newProductForm) {
        formElementsArray.push({
            id: key,
            config: newProductForm[key]
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
            <Card className={classes.NewProduct}>
                <Card.Body>
                    <h4 className='card-title text-center mb-4 mt-1'>Nuevo Producto</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler} className="d-flex flex-column">
                        {form}
                        <Image style={{ maxWidth: '50%', margin: '5px auto' }} src={newProductForm.image.value} onError={imageErrorHandler} thumbnail />
                        <Button
                            type='submit'
                            variant='primary'
                            size='lg'
                            block
                            disabled={!newProductForm.name.valid || !newProductForm.category.valid || !newProductForm.description.valid || !newProductForm.cost.valid || !newProductForm.image.valid}
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

export default withRouter(NewProduct)
