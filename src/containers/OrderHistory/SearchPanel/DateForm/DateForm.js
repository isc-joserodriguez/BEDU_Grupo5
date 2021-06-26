import React from 'react'

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';

import classes from './DateForm.module.css';

const DateForm = ({ dateForm, setDateForm }) => {
    const inputChangedHandler = (date, controlName) => {
        let d1 = new Date(date);
        if (controlName === 'minDate') {
            if (!!dateForm.maxDate.value) {
                let d2 = new Date(dateForm.maxDate.value);
                if (d1.getTime() > d2.getTime()) date = d2;
            }
        }
        if (controlName === 'maxDate') {
            if (!!dateForm.minDate.value) {
                let d2 = new Date(dateForm.minDate.value);
                if (d1.getTime() < d2.getTime()) date = d2;
            }
        }
        const updatedControls = updateObject(dateForm, {
            [controlName]: updateObject(dateForm[controlName], {
                value: date,
                touched: true
            })
        });
        console.log(dateForm)
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
