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
    <tr className={`list-item ${props.done ? 'done' : ''}`}>
      <td>
        <Check done={props.done} change={props.change} id={props.id} />
      </td>
      <td>
        {props.id}
      </td>
      <td>
        {props.task}
      </td>
      <td>
        None
      </td>
      <td>
        <ImEye className="blue is-pulled-right" onClick={open}/>
      </td>
      <td>
        <RiDeleteBin2Fill className="orange is-pulled-right" onClick={onDelete}/>
      </td>
    </tr>
  )
}

Todo.propTypes = {
  done: PropTypes.bool,

}

export default Todo;