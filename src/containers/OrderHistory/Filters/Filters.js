import React from 'react';
import PropTypes from 'prop-types';

import { Button, FormControl, InputGroup } from 'react-bootstrap'

import classes from './Filters.module.css';

const Filters = (props) => {
  let counter = null;
  if (props.show) {
    counter = props.orders.filter(e => !e.status).length;
  }
  else {
    counter = props.orders.length;
  }

  const onChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.changeValue(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.filterHandler();
  }

  return (
    <form className={classes.Filter} onSubmit={onSubmit} >
      <div className={classes.FilterItems}>
        <label>Estatus: </label>
        <Button className={classes.orangeBtn} onClick={props.showHide} size='sm'>{props.show ? 'Ver todos' : 'Ver pendientes'}</Button>
      </div>
{/*       <div className={classes.FilterItems}>
        <InputGroup className='mb-3' size='sm'>
          <FormControl
            placeholder='Buscar una orden...'
            aria-label='search'
            aria-describedby='basic-addon2'
            value={props.value} onChange={onChange}
          />
          <InputGroup.Append>
            <Button className={classes.orangeBtn} type='submit' size='sm'>Buscar</Button>
          </InputGroup.Append>
        </InputGroup>
      </div> */}
      <div className={classes.FilterItems}>
        <label className={classes.orange}>Hay {counter} orden(es)</label>
      </div>
    </form>
  )
};

Filters.propTypes = {
  changeValue: PropTypes.func.isRequired,
  filterHandler: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  showHide: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default Filters;