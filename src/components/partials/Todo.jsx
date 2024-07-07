import React from 'react';
import moment from 'moment';
import { deleteTodoApi, markTodoApi } from '../../services/api';
import { toast } from 'react-toastify';

function Todo({ todo, setRefreshList }) {

  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todoId: todo._id
    });

    console.log('delete todo', result);
    
    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast('Deleted');
    } else {
      toast('Failed to delete, please try again');
    }
  };

  const handleMarkTodo = async () => {
    const result = await markTodoApi({
      todoId: todo._id
    });

    console.log('Mark todo', result);
    
    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast('Deleted');
    } else {
      toast('Failed to Mark, please try again');
    }
  };

  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light'>
      <div className="card-header">
        {todo.isCompleted ? 'Completed' : 'Not Completed'}
      </div>
      <div className="card-body">
        <h4 className='card-title' style={{textDecoration: !todo.isCompleted ? 'line-through' : 'none'}}>{todo.desc}</h4>
        <p className='card-text'>{moment(todo.date).fromNow()}</p>
        <div className="actionButton" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="deleteButton">
            <button style={{ background: 'red' }} onClick={handleDelete}>Delete</button>
          </div>
          <div className="markTodo">
            <button onClick={handleMarkTodo} style={{ background: 'lightgreen' }}>
              {todo.isCompleted ? 'Mark Uncomplete' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
