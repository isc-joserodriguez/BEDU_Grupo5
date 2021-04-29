import React from 'react';
import Check from './Checkmark';
import './todo.css';
import PropTypes from 'prop-types';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImEye } from 'react-icons/im';

function Todo(props) {

  const onDelete = (event) => {
    props.delete(props.id);
    event.preventDefault();
    event.stopPropagation();
  }

  const open = (event) => {

  }

  return (
    <tr>
      <td>
        <Check status={props.status} change={props.change} id={props.id} status={props.status} />
      </td>
      <td>
        {props.id}
      </td>
      <td>
        {props.order}
      </td>
      <td>
        {props.cost}
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