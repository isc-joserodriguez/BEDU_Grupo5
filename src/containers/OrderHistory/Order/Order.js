import React from 'react';
import PropTypes from 'prop-types';

import { RiDeleteBin2Fill as DeleteIcon } from 'react-icons/ri';
import { TiCancel as CancelIcon } from 'react-icons/ti'
import { ImEye as DetailIcon } from 'react-icons/im';
import Checkmark from './Checkmark/Checkmark';

import classes from './Order.module.css';

const Order = (props) => {
  const onDelete = (event) => {
    props.delete(props.order._id);
    event.preventDefault();
    event.stopPropagation();
  }

  const onChangeStatus = (event) => {
    props.change(props.order._id);
    event.preventDefault();
    event.stopPropagation();
  }
  const date = new Date(props.order.createdAt);

  return (
    <tr>
      <td>
        <Checkmark status={props.order.status} change={props.change} id={props.order._id} />
      </td>
      <td>
        {props.order._id.substring(props.order._id.length - 7)}
      </td>
      <td>
        {`${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`}
      </td>
      <td>
        {`${props.order.idCliente.firstName} ${props.order.idCliente.lastName}`}
      </td>
      <td>
        {
          `${props.order.info.length} productos`
        }
      </td>
      <td>
        {`$${props.order.cost.toFixed(2)}`}
      </td>
      <td>
        <DetailIcon className={classes.blue} onClick={() => { props.setOrder(props.order); props.handleShow(); }} />
      </td>

      {
        localStorage.getItem('type') === 'admin' ? (
          props.order.status === 1 ? (
            <td>
              <CancelIcon className={classes.orange} onClick={onChangeStatus} />
            </td>
          ) : (
            props.order.status === 0 ? (
              <td>
                <DeleteIcon className={classes.orange} onClick={onDelete} />
              </td>
            ) : <td></td>
          )
        ) : (
          localStorage.getItem('type') === 'cliente' ? (
            props.order.status === 1 ?
              <td>
                <CancelIcon className={classes.orange} onClick={onChangeStatus} />
              </td> :
              <td></td>
          ) : null
        )
      }


    </tr>
  )
}

Order.propTypes = {
  change: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  setOrder: PropTypes.func.isRequired,
}

export default Order;