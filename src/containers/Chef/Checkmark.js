import React from 'react';
import PropTypes from 'prop-types';
import { BsCheckCircle } from 'react-icons/bs';

import classes from './checkmark.module.css';


  function Checkmark(props) {
    const onChangeTask = (event) => {
        props.change(props.id);
        event.preventDefault();
        event.stopPropagation();
    }
    return (
    <span className={`${classes.Check} ${props.done ? '': 'doneMark'}`}  onClick={ (event) => onChangeTask(event)} >
      <BsCheckCircle className={classes.Green}/>
    </span>
  )
};

Checkmark.propTypes = {
  done: PropTypes.bool
}

export default Checkmark