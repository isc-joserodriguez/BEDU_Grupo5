import React from 'react'

import { updateObject } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';

import classes from './CheckForm.module.css';
const CheckForm = ({ checkForm, setCheckForm }) => {
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(checkForm, {
            [controlName]: updateObject(checkForm[controlName], {
                value: event.target.checked,
                touched: true
            })
        });
        setCheckForm(updatedControls);
    }

    const formChecksArray = [];
    for (let key in checkForm) {
        formChecksArray.push({
            id: key,
            config: checkForm[key]
        })
    }

    let form = formChecksArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            icon={formElement.config.icon}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            invalid={!formElement.config.valid}
            errorMessage={formElement.config.errorMessage}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    return (
        < form className={classes.CatCommands}>
            {form}
        </form >
    )
}

export default CheckForm
