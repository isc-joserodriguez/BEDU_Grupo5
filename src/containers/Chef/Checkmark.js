import React from 'react';
import PropTypes from 'prop-types';
import './checkmark.css';
import { BsCheckCircle } from 'react-icons/bs';



  function Checkmark(props) {
    const onChangeTask = (event) => {
        props.change(props.id);
        event.preventDefault();
        event.stopPropagation();
    }
    return (
    <span className={`check ${props.done ? '': 'doneMark'}`}  onClick={ (event) => onChangeTask(event)} >
      <BsCheckCircle className="green"/>
    </span>
  )
};

Checkmark.propTypes = {
  done: PropTypes.bool
}

export default Checkmark