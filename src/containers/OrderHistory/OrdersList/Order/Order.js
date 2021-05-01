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

  const open = (event) => {
    props.handleShow()
    props.setOrder(props.order)
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
      <td >
        <DetailIcon className={`${classes.blue} is-pulled-right`} onClick={open} />
      </td>
      <td>
        {
          localStorage.getItem('type') === 'admin' ? (
            props.order.status === 1 ? (
              <CancelIcon className={`${classes.orange} is-pulled-right`} onClick={onChangeStatus} />
            ) : (
              props.order.status === 0 ? (
                <DeleteIcon className={`${classes.orange} is-pulled-right`} onClick={onDelete} />
              ) : null
            )
          ) : (
            localStorage.getItem('type') === 'cliente' ? (
              props.order.status === 1 ?
                <CancelIcon className={`${classes.orange} is-pulled-right`} onClick={onChangeStatus} /> :
                null
            ) : null
          )
        }
      </td>

    </tr>
  )
}

Order.propTypes = {
  done: PropTypes.bool,

}

export default Order;