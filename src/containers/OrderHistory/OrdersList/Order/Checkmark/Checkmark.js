import React from 'react';
import PropTypes from 'prop-types';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiLoader2Line } from 'react-icons/ri';

import classes from './Checkmark.module.css';


const Checkmark = (props) => {
  const onChangeTask = (event) => {
    props.change(props.id);
    event.preventDefault();
    event.stopPropagation();
  }

  if (props.status === 1) {
    return (
      <span onClick={(event) => onChangeTask(event)} >
        <AiFillClockCircle className={classes.Green} />
      </span>
    )
  }
  else if (props.status === 2) {
    return (
      <span onClick={(event) => onChangeTask(event)} >
        <RiLoader2Line className={classes.Green} />
      </span>
    )
  }
  else if (props.status === 3) {
    return (
      <span className={`${classes.Check} ${props.done ? '' : 'doneMark'}`} >
        <BsCheckCircle className={classes.Green} />
      </span>
    )
  }
  else {
    return ('')
  }

};

Checkmark.propTypes = {
  done: PropTypes.bool
}

export default Checkmark