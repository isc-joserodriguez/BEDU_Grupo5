import React from 'react';
import PropTypes from 'prop-types';

import { TiCancel as CanceledIcon } from 'react-icons/ti'
import { BsCheckCircle as ReadyIcon } from 'react-icons/bs';
import { AiFillClockCircle as WaitingIcon } from 'react-icons/ai';
import { RiLoader2Line as CreatingIcon } from 'react-icons/ri';
import { GoPackage as DeliveredIcon } from 'react-icons/go';

import classes from './Checkmark.module.css';

const Checkmark = (props) => {
  const isClient = localStorage.getItem('type') === 'cliente';
  const isChef = localStorage.getItem('type') === 'chef';
  const isMesero = localStorage.getItem('type') === 'mesero';
  const icons = {
    0: <CanceledIcon className={classes.Grey} />,
    1: <WaitingIcon className={classes.Yellow} />,
    2: <CreatingIcon className={classes.GreenBlue} />,
    3: <ReadyIcon className={classes.Green} />,
    4: <DeliveredIcon className={classes.Pink} />
  }
  let icon = icons[props.status];

  const onChangeTask = (event) => {
    if (isClient) return;
    if (isChef && props.status !== 1 && props.status !== 2) return;
    if (isMesero && props.status !== 3) return;
    props.change(props.id);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <span className={(!isClient && props.status !== 0) ? classes.Check : ''} onClick={onChangeTask} >
      {icon}
    </span>
  )
};

Checkmark.propTypes = {
  status: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Checkmark