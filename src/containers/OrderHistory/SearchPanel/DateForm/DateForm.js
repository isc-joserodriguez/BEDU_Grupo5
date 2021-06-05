import React from 'react'

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';

import classes from './DateForm.module.css';

const DateForm = ({ dateForm, setDateForm }) => {
    const inputChangedHandler = (date, controlName) => {
        const updatedControls = updateObject(dateForm, {
            [controlName]: updateObject(dateForm[controlName], {
                value: date,
                touched: true
            })
        });
        setDateForm(updatedControls);
    }

    const formChecksArray = [];
    for (let key in dateForm) {
        formChecksArray.push({
            id: key,
            config: dateForm[key]
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
            changed={(date) => inputChangedHandler(date, formElement.id)} />
    ));
    return (
        <>
            {form}
        </>

    )
}

export default DateForm
