import React from 'react';
import './filters.css';
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup';

function filters(props) {
  let counter = null;
  if (props.show) {
    counter = props.orders.filter(e => !e.status).length;
  }
  else {
    counter = props.orders.length;
  }

  function onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    props.changeValue(e.target.value)
  }
  function onSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    props.filterDo();
  }

  return (
    <form onSubmit={onSubmit} >
      <div>
        <label>Estatus: </label>
        <Button className="orangeBtn" onClick={props.showHide} size="sm">{props.show ? "Ver todos": "Ver pendientes"}</Button>
      </div>
      <div>
        <InputGroup className="mb-3" size="sm">
          <FormControl 
            placeholder="Buscar una orden..."
            aria-label="search"
            aria-describedby="basic-addon2"
            value={props.value} onChange={onChange}
          />
          <InputGroup.Append>
            <Button className='orangeBtn' type="submit" size="sm">Buscar</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>

      <label className="orange">Hay {counter} orden(es)</label>
    </form>
  )
};

export default filters;