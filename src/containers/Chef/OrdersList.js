import React from 'react';
import Todo from './Todo';
import './ordersList.css';
import Table from 'react-bootstrap/Table'

function OrdersList(props) {
  let elements = null;
  if (props.show) {
    elements = props.tasks.filter(e => !e.status);
  }
  else {
    elements = props.tasks;
  }
  if (props.filter) {
    if (props.value.trim() === "") {
      elements = elements.map(element =>
        <Todo key={element.id} task={element.task} done={element.status} id={element.id} change={props.change} delete={props.delete} />
      )
      props.filterDo();
    }
    else {
      elements = props.tasks.filter(e => (e.task.search(props.value))).map(element =>
        <Todo key={element.id} task={element.task} done={element.status} id={element.id} change={props.change} delete={props.delete} />)
        props.filterDo();
      }
  }
  else {
    elements = props.tasks.map(element => <Todo key={element.id} task={element.task} done={element.status} id={element.id} change={props.change} delete={props.delete} />)
  }




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
