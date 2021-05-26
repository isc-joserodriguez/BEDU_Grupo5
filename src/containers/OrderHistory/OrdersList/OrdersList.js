import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table' 

import Order from './Order/Order';
import classes from './OrdersList.module.css';
const OrdersList = (props) => {
  let elements = null;
  if (props.show) {
    elements = [...props.orders].filter(e => {
      switch (localStorage.getItem('type')) {
        case 'chef':
          return (e.status === 1 || e.status === 2);
        case 'mesero':
          return e.status === 3
        default:
          return (e.status === 1 || e.status === 2 || e.status === 3)
      }
    });
  }
  else {
    elements = [...props.orders];
  }

  elements = elements.map(order => <Order
    key={order._id}
    order={order}
    change={props.change}
    delete={props.delete}
    handleShow={props.handleShow}
    setOrder={props.setOrder}
  />)



  return (
    <div className={classes.OrdersList}>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Listo</th>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Cant. productos</th>
            <th>Costo</th>
            <th>Detalles</th>
            <th>
              {
                localStorage.getItem('type') === 'admin' ?
                  'Cancelar/Eliminar' :
                  localStorage.getItem('type') === 'cliente' ?
                    'Cancelar' : null
              }

            </th>

          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
      </Table>
    </div>
  )
}

OrdersList.propTypes = {
  change: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  filterHandler: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
}

export default OrdersList;
