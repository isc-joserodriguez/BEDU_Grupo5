import React from 'react';
import Check from './Checkmark';
import './todo.css';
import PropTypes from 'prop-types';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImEye } from 'react-icons/im';
import { getProductById } from '../../services';

function Todo(props) {


  const onDelete = (event) => {
    props.delete(props.order._id);
    event.preventDefault();
    event.stopPropagation();
  }

  const open = (event) => {
    props.handleShow()
    props.setOrder({_id: ""})
    console.log(props.order)
  }
  const date = new Date(props.order.createdAt);

  return (
    <tr>
      <td>
        <Check status={props.order.status} change={props.change} id={props.order._id}/>
      </td>
      <td>
        {props.order._id.substring(props.order._id.length-7)}
      </td>
      <td>
        {`${date.getDate()+1}/${date.getMonth()+1}/${date.getFullYear()}`}
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
        <ImEye className="blue is-pulled-right" onClick={open} />
      </td>
      {
        localStorage.getItem("type") === "admin" &&
        <td>
          <RiDeleteBin2Fill className="orange is-pulled-right" onClick={onDelete} />
        </td>
      }

    </tr>
  )
}

Todo.propTypes = {
  done: PropTypes.bool,

}

export default Todo;