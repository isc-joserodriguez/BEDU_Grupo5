import React from 'react';
import PropTypes from 'prop-types';

import { Form, InputGroup } from 'react-bootstrap';

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import classes from './Input.module.css'

registerLocale('es', es);


const Input = (props) => {
    let inputElement = null;
    let errorMessage = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorMessage = <p className={`${classes.InvalidMessage} text-center`}>{props.errorMessage}</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <Form.Control
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            )
            break;
        case ('group'):
            inputElement = (
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text> <props.icon /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
                    </InputGroup>
                </Form.Group>
            )
            break;
        case ('check'):
            inputElement = (
                <Form.Check
                    key={props.label}
                    type='checkbox'
                    label={props.label}
                    onChange={props.changed}
                />
            )
            break;
        case ('select'):
            inputElement = (
                <Form.Control
                    as='select'
                    className={`${inputClasses.join(' ')} mb-3`}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </Form.Control>
            )
            break;
        case ('datepicker'):
            inputElement = (
                <DatePicker
                    className={`${inputClasses.join(' ')} mb-3 form-control`}
                    placeholderText={props.elementConfig.placeholder}
                    locale='es'
                    selected={props.value}
                    onChange={props.changed}
                />
            )
            break;
        default:
            inputElement = <Form.Control className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} />
    }
    return (

        <>
            {inputElement}
            {errorMessage}
        </>
    );
};

Input.propTypes = {
    changed: PropTypes.func.isRequired,
    elementConfig: PropTypes.object,
    elementType: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    icon: PropTypes.func,
    invalid: PropTypes.bool.isRequired,
    shouldValidate: PropTypes.object,
    touched: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.instanceOf(Date)
    ])
}

export default Input;