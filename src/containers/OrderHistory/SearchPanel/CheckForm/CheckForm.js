import React from 'react'

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';

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
    {/* <div>
            <ul>
                <li
                    className={classes.orangeLink}
                    onClick={props.showHide}
                    size='sm'
                >
                    Cat 1
            </li>
                <li
                    className={classes.orangeLink}
                    onClick={props.showHide}
                    size='sm'
                >
                    Cat 2
            </li>
                <li
                    className={classes.orangeLink}
                    onClick={props.showHide}
                    size='sm'
                >
                    Cat 3
            </li>
                <li
                    className={`${classes.orangeLink} ${classes.last}`}
                    onClick={props.showHide}
                    size='sm'
                >
                    Ver todas
            </li>
            </ul>
            <p className={classes.orangeLink}></p>
        </div>
     */}
    return (
        < form className={classes.CatCommands}>
            {form}
        </form >
    )
}

export default CheckForm
