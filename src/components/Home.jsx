import React, { useState, useEffect } from 'react';
import Header from './partials/Header';
import Todo from './partials/Todo';
import AddTodoModal from './partials/AddTodoModal';
import { getTodoListApi, getToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    } else {
      fetchTodoList();
    }
  }, [refreshList, navigate]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredList(list);
    } else {
      const filterList = list.filter(todo =>
        todo.desc.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      setFilteredList(filterList);
    }
  }, [list, searchText]);

  async function fetchTodoList() {
    try {
      const result = await getTodoListApi();
      if (result.status === 200 && result.data.status === 200) {
        setList(result.data.data.todos.reverse());
      } else {
        toast.error('Failed to fetch todo list');
      }
    } catch (error) {
      toast.error('Error fetching todo list');
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-md-center">
          {filteredList.map((todo) => (
            <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />
          ))}
          {filteredList.length === 0 && (
            <div className="notFoundTodos">
              No todos found
            </div>
          )}
        </div>
      </div>
      <div style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
        <button
          type='button'
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className='btn btn-outline-light'
        >
          Add
        </button>
      </div>
      <AddTodoModal setRefreshList={setRefreshList} />
    </div>
  );
}

export default Home;
