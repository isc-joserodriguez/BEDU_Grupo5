import React from 'react';
import Todo from './Todo';
import './ordersList.css';
import Table from 'react-bootstrap/Table'

function OrdersList(props) {
  let elements = null;
  if (props.show) {
    elements = [...props.orders].filter(e => !e.status);
  }
  else {
    elements = [...props.orders];
  }

  elements = elements.map(element => <Todo key={element.id} task={element.task} done={element.status} id={element.id} change={props.change} delete={props.delete} />)



  /* if (props.filter) {
    if (props.value.trim() === "") {
      props.filterDo();
    }
    else {
      console.log(props.value);
      elements = elements.filter(e => (e.task.search(props.value))).map(element =>
        <Todo key={element.id} task={element.task} done={element.status} id={element.id} change={props.change} delete={props.delete} />)

    }
  }
  else {
    elements = elements.map(element => <Todo key={element.id} task={element.task} done={element.status} id={element.id} change={props.change} delete={props.delete} />)
  } */




  return (
    <div className="container-list">
      <Table responsive>
        <thead>
          <tr>
            <th>Listo</th>
            <th>ID</th>
            <th>Descripción</th>
            <th>Observaciones</th>
            <th>Abrir</th>
            <th>Cancelar</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
      </Table>
    </div>
  )
}




export default OrdersList;
