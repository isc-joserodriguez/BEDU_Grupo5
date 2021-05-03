import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../../shared/utility';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdSubtitles, MdAttachMoney, MdImage } from 'react-icons/md'
import { editProduct, getProductByIdForm } from '../../../../services';

import { Image } from 'react-bootstrap';

import classes from './EditProduct.module.css';

const EditProduct = props => {
    const { id } = useParams();
    const [editForm, setEditForm] = useState({
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
        getProductByIdForm({ id, editForm, setEditForm, updateObject, setLoading })
        
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(editForm, {
            [controlName]: updateObject(editForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, editForm[controlName].validation),
                touched: true
            })
        });
        setEditForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        const data = {
            name: editForm.name.value,
            idCategoria: editForm.category.value,
            description: editForm.description.value,
            cost: editForm.cost.value,
            image: editForm.image.value
        }

        editProduct({
            id,
            data,
            setLoading,
            setErrorMessage,
            history: props.history
        });
    }

    const imageErrorHandler = (event) => {
        event.target.src = 'https://www.ninjaseo.com.au/wp-content/uploads/2016/07/placeholder4.png'
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
            <Card className={classes.EditProduct}>
                <Card.Body>
                    <h4 className='card-title text-center mb-4 mt-1'>Editar Producto</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler} className="d-flex flex-column">
                        {form}
                        <Image style={{ maxWidth: '50%', margin: '5px auto' }} src={editForm.image.value} onError={imageErrorHandler} thumbnail />
                        <Button
                            type='submit'
                            variant='primary'
                            size='lg'
                            block
                            disabled={!editForm.name.valid || !editForm.description.valid || !editForm.cost.valid || !editForm.image.valid}
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

export default withRouter(EditProduct)
