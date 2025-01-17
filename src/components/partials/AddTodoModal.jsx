import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTodoApi } from '../../services/api';

function AddTodoModal({setRefreshList}) {
    const [todoDesc, setTodoDesc] = useState('')
    
    const handleTodoSubmit= async()=>{
        console.log(todoDesc,'todoDesc')
        if(todoDesc===''){
            toast('Todo is required')
            return

        }

        const result =await createTodoApi({desc:todoDesc});
        console.log(result);

        if(result.status===200 && result.data.status===200){
            toast('Todo Added');
            setRefreshList(new Date())
            setTodoDesc('')
        }else{
            toast(result.data.message);

        }
    }
  
    return (
    <div className="modal mt-5" id="exampleModal">
        <ToastContainer/>
      <div className="modal-dialog" role="document"></div>
    <div className="modal-content">
    <div className="modal-header">
    <div className="modal-title">Add New Todo</div>
    <button type="button" className='btn-close'
    data-bs-dismis="modal"
    aria-label='close'>
      <span arial-hidden="true"></span>
    </button>
   </div>
   <div className='modal-body'>
    <div className="form-group">
      <textarea name="" 
       className="form-control"
       
       rows={3}
       onChange={(e)=>{setTodoDesc(e.target.value)}}
       placeholder='Write todos...'

       ></textarea>
    </div>
   </div>
        
   <div className="modal-footer">
     <button className='btn btn-secondary' onClick={()=>{setTodoDesc('')}} data-bs-dismiss="modal">Close</button>
     <button className='btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss="modal">Save Todo</button>
   </div>




   </div>
   </div>
  )
}

export default AddTodoModal