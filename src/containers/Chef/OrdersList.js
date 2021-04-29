import React from 'react';
import Todo from './Todo';
import './ordersList.css';
import Table from 'react-bootstrap/Table'

function OrdersList(props) {
  let elements = null;
  if (props.show) {
    elements = [...props.orders].filter(e => e.status == 1);
  }
  else {
    elements = [...props.orders];
  }
  console.log(elements)
  elements = elements.map(element => <Todo key={element._id} order={element.info} status={element.status} id={element._id} cost={element.cost} change={props.change} delete={props.delete} />)



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
            <th>Costo</th>
            <th>Detalles</th>
            {
              localStorage.getItem("type") === "admin"? <th>Cancelar</th>:null
            }
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
