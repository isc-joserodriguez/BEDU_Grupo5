import React from 'react'

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';

import classes from './InfoForm.module.css';

const InfoForm = ({ infoForm, setInfoForm }) => {
    const inputChangedHandler = (event, controlName) => {
        let value = event.target.value;
        if (controlName === 'minPrice' && infoForm.maxPrice.value !== '') {
            if (+infoForm.maxPrice.value < +value) value = infoForm.maxPrice.value;
        }
        if (controlName === 'maxPrice' && infoForm.minPrice.value !== '') {
            if (+infoForm.minPrice.value > +value) value = infoForm.minPrice.value;
        }
        if (+value < 0) value = '0';
        const updatedControls = updateObject(infoForm, {
            [controlName]: updateObject(infoForm[controlName], {
                value,
                touched: true
            })
        });
        setInfoForm(updatedControls);
    }

    const formChecksArray = [];
    for (let key in infoForm) {
        formChecksArray.push({
            id: key,
            config: infoForm[key]
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
        <div>
            {form}
        </div>
    )
}

export default InfoForm
