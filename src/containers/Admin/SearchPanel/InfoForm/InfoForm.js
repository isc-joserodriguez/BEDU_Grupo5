import React from 'react'

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';

import classes from './InfoForm.module.css';

const InfoForm = ({ infoForm, setInfoForm }) => {
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(infoForm, {
            [controlName]: updateObject(infoForm[controlName], {
                value: event.target.value,
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
