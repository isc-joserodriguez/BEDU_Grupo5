import React from 'react';
import PropTypes from 'prop-types';

import { TiCancel as CanceledIcon } from 'react-icons/ti'
import { BsCheckCircle as ReadyIcon } from 'react-icons/bs';
import { AiFillClockCircle as WaitingIcon } from 'react-icons/ai';
import { RiLoader2Line as CreatingIcon } from 'react-icons/ri';

import classes from './Checkmark.module.css';

const Checkmark = (props) => {

  const isClient = localStorage.getItem('type') === 'cliente';
  const isChef = localStorage.getItem('type') === 'chef';
  const isMesero = localStorage.getItem('type') === 'mesero';
  let icon = null;

  const onChangeTask = (event) => {
    if (isClient) return;
    if (isChef && props.status !== 1 && props.status !== 2) return;
    if (isMesero && props.status !== 3) return;
    props.change(props.id);
    event.preventDefault();
    event.stopPropagation();
  }

  switch (props.status) {
    case 0:
      icon = <CanceledIcon className={classes.Green} />
      break;
    case 1:
      icon = <WaitingIcon className={classes.Green} />
      break
    case 2:
      icon = <CreatingIcon className={classes.Green} />
      break
    case 3:
      icon = <ReadyIcon className={classes.Green} />
      break
    default:
      icon = null;
  }
  return (
    <span className={(!isClient && props.status !== 0) ? classes.Check : ''} onClick={onChangeTask} >
      {icon}
    </span>
  )
};

Checkmark.propTypes = {
  done: PropTypes.bool
}

export default Checkmark